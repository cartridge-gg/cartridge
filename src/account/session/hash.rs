use cainome::cairo_serde::CairoSerde;
use serde_json::json;
use starknet::core::utils::{get_selector_from_name, NonAsciiNameError};
use starknet::macros::{selector, short_string};
use starknet_crypto::{poseidon_hash_many, poseidon_permute_comp, FieldElement};

use crate::abigen::cartridge_account::{Signer, SignerSignature};

use crate::signers::{SignError, SignerTrait};

use super::merkle::MerkleTree;

#[derive(Clone, Debug, PartialEq)]
pub struct ProvedMethod {
    pub(crate) method: AllowedMethod,
    pub(crate) proof: Vec<FieldElement>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Session {
    expires_at: u64,
    allowed_methods: Vec<ProvedMethod>,
    allowed_methods_root: FieldElement,
    metadata: String,
    session_key_guid: FieldElement,
}

impl Session {
    pub fn new(
        allowed_methods: Vec<AllowedMethod>,
        expires_at: u64,
        signer: &Signer,
    ) -> Result<Self, SignError> {
        if allowed_methods.is_empty() {
            return Err(SignError::NoAllowedSessionMethods);
        }
        let metadata = json!({ "metadata": "metadata", "max_fee": 0 });
        let hashes = allowed_methods
            .iter()
            .map(AllowedMethod::as_merkle_leaf)
            .collect::<Vec<FieldElement>>();
        let allowed_methods: Vec<_> = allowed_methods
            .into_iter()
            .enumerate()
            .map(|(i, method)| ProvedMethod {
                method,
                proof: MerkleTree::compute_proof(hashes.clone(), i),
            })
            .collect();
        let root = MerkleTree::compute_root(hashes[0], allowed_methods[0].proof.clone());
        Ok(Self {
            expires_at,
            allowed_methods,
            allowed_methods_root: root,
            metadata: serde_json::to_string(&metadata).unwrap(),
            session_key_guid: signer.into_guid(),
        })
    }
    fn allowed_method_hash_rev_1() -> FieldElement {
        selector!("\"Allowed Method\"(\"Contract Address\":\"ContractAddress\",\"selector\":\"selector\")")
    }
    pub fn raw(&self) -> RawSession {
        RawSession {
            expires_at: self.expires_at,
            allowed_methods_root: self.allowed_methods_root,
            metadata_hash: FieldElement::ZERO,
            session_key_guid: self.session_key_guid,
        }
    }
    pub fn message_hash(
        &self,
        tx_hash: FieldElement,
        chain_id: FieldElement,
        address: FieldElement,
    ) -> Result<FieldElement, NonAsciiNameError> {
        let token_session_hash = self.raw().get_message_hash_rev_1(chain_id, address);
        let mut msg_hash = [tx_hash, token_session_hash, FieldElement::TWO];
        poseidon_permute_comp(&mut msg_hash);
        Ok(msg_hash[0])
    }
    pub fn single_proof(&self, call: &AllowedMethod) -> Option<Vec<FieldElement>> {
        self.allowed_methods
            .iter()
            .find(|ProvedMethod { method, .. }| method == call)
            .map(|ProvedMethod { proof, .. }| proof.clone())
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct AllowedMethod {
    pub contract_address: FieldElement,
    pub selector: FieldElement,
}

impl AllowedMethod {
    pub fn new(
        contract_address: FieldElement,
        name: &str,
    ) -> Result<AllowedMethod, NonAsciiNameError> {
        Ok(Self::with_selector(
            contract_address,
            get_selector_from_name(name)?,
        ))
    }
    pub fn with_selector(contract_address: FieldElement, selector: FieldElement) -> AllowedMethod {
        Self {
            contract_address,
            selector,
        }
    }
}

impl AllowedMethod {
    pub fn as_merkle_leaf(&self) -> FieldElement {
        poseidon_hash_many(&vec![
            Session::allowed_method_hash_rev_1(),
            self.contract_address,
            self.selector,
        ])
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct RawSession {
    expires_at: u64,
    allowed_methods_root: FieldElement,
    metadata_hash: FieldElement,
    session_key_guid: FieldElement,
}

impl RawSession {
    fn session_type_hash_rev_1() -> FieldElement {
        selector!(
            "\"Session\"(\"Expires At\":\"timestamp\",\"Allowed Methods\":\"merkletree\",\"Metadata\":\"string\",\"Session Key\":\"felt\")"
        )
    }
    fn get_struct_hash_rev_1(&self) -> FieldElement {
        poseidon_hash_many(&vec![
            Self::session_type_hash_rev_1(),
            self.expires_at.into(),
            self.allowed_methods_root,
            self.metadata_hash,
            self.session_key_guid,
        ])
    }
    pub fn get_message_hash_rev_1(
        &self,
        chain_id: FieldElement,
        contract_address: FieldElement,
    ) -> FieldElement {
        let domain = StarknetDomain {
            name: short_string!("SessionAccount.session"),
            version: short_string!("1"),
            chain_id,
            revision: FieldElement::ONE,
        };
        poseidon_hash_many(&vec![
            short_string!("StarkNet Message"),
            domain.get_struct_hash_rev_1(),
            contract_address,
            self.get_struct_hash_rev_1(),
        ])
    }
}

#[derive(Clone, Debug, PartialEq)]
struct StarknetDomain {
    name: FieldElement,
    version: FieldElement,
    chain_id: FieldElement,
    revision: FieldElement,
}

impl StarknetDomain {
    fn session_type_hash_rev_1() -> FieldElement {
        selector!(
            "\"StarknetDomain\"(\"name\":\"shortstring\",\"version\":\"shortstring\",\"chainId\":\"shortstring\",\"revision\":\"shortstring\")"
        )
    }
    fn get_struct_hash_rev_1(&self) -> FieldElement {
        poseidon_hash_many(&vec![
            Self::session_type_hash_rev_1(),
            self.name,
            self.version,
            self.chain_id,
            self.revision,
        ])
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct RawSessionToken {
    pub(crate) session: RawSession,
    pub(crate) session_authorization: Vec<FieldElement>,
    pub(crate) session_signature: SignerSignature,
    pub(crate) guardian_signature: SignerSignature,
    pub(crate) proofs: Vec<Vec<FieldElement>>,
}

impl CairoSerde for RawSession {
    type RustType = Self;

    fn cairo_serialized_size(rust: &Self::RustType) -> usize {
        u64::cairo_serialized_size(&rust.expires_at)
            + FieldElement::cairo_serialized_size(&rust.allowed_methods_root)
            + FieldElement::cairo_serialized_size(&rust.metadata_hash)
            + FieldElement::cairo_serialized_size(&rust.session_key_guid)
    }

    fn cairo_serialize(rust: &Self::RustType) -> Vec<FieldElement> {
        vec![
            u64::cairo_serialize(&rust.expires_at),
            FieldElement::cairo_serialize(&rust.allowed_methods_root),
            FieldElement::cairo_serialize(&rust.metadata_hash),
            FieldElement::cairo_serialize(&rust.session_key_guid),
        ]
        .concat()
    }

    fn cairo_deserialize(
        felts: &[FieldElement],
        mut offset: usize,
    ) -> cainome::cairo_serde::Result<Self::RustType> {
        let expires_at = u64::cairo_deserialize(felts, offset)?;
        offset += u64::cairo_serialized_size(&expires_at);
        let allowed_methods_root = FieldElement::cairo_deserialize(felts, offset)?;
        offset += FieldElement::cairo_serialized_size(&allowed_methods_root);
        let metadata_hash = FieldElement::cairo_deserialize(felts, offset)?;
        offset += FieldElement::cairo_serialized_size(&metadata_hash);
        let session_key_guid = FieldElement::cairo_deserialize(felts, offset)?;

        Ok(Self {
            expires_at,
            allowed_methods_root,
            metadata_hash,
            session_key_guid,
        })
    }
}

impl CairoSerde for RawSessionToken {
    type RustType = Self;

    fn cairo_serialized_size(rust: &Self::RustType) -> usize {
        RawSession::cairo_serialized_size(&rust.session)
            + <Vec<FieldElement>>::cairo_serialized_size(&rust.session_authorization)
            + SignerSignature::cairo_serialized_size(&rust.session_signature)
            + SignerSignature::cairo_serialized_size(&rust.guardian_signature)
            + <Vec<Vec<FieldElement>>>::cairo_serialized_size(&rust.proofs)
    }

    fn cairo_serialize(rust: &Self::RustType) -> Vec<FieldElement> {
        vec![
            RawSession::cairo_serialize(&rust.session),
            <Vec<FieldElement>>::cairo_serialize(&rust.session_authorization),
            SignerSignature::cairo_serialize(&rust.session_signature),
            SignerSignature::cairo_serialize(&rust.guardian_signature),
            <Vec<Vec<FieldElement>>>::cairo_serialize(&rust.proofs),
        ]
        .concat()
    }

    fn cairo_deserialize(
        felts: &[FieldElement],
        mut offset: usize,
    ) -> cainome::cairo_serde::Result<Self::RustType> {
        let session = RawSession::cairo_deserialize(felts, offset)?;
        offset += RawSession::cairo_serialized_size(&session);
        let session_authorization = <Vec<FieldElement>>::cairo_deserialize(felts, offset)?;
        offset += <Vec<FieldElement>>::cairo_serialized_size(&session_authorization);
        let session_signature = SignerSignature::cairo_deserialize(felts, offset)?;
        offset += SignerSignature::cairo_serialized_size(&session_signature);
        let guardian_signature = SignerSignature::cairo_deserialize(felts, offset)?;
        offset += SignerSignature::cairo_serialized_size(&guardian_signature);
        let proofs = <Vec<Vec<FieldElement>>>::cairo_deserialize(felts, offset)?;

        Ok(Self {
            session,
            session_authorization,
            session_signature,
            guardian_signature,
            proofs,
        })
    }
}
