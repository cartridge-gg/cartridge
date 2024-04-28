use async_trait::async_trait;
use cainome::cairo_serde::CairoSerde;
use serde::Serialize;
use starknet::{
    accounts::{
        Account, Call, ConnectedAccount, Declaration, Execution, ExecutionEncoder,
        LegacyDeclaration, RawDeclaration, RawExecution, RawLegacyDeclaration,
    },
    core::{
        crypto::EcdsaSignError,
        types::{
            contract::legacy::LegacyContractClass, BlockId, BlockTag, FieldElement,
            FlattenedSierraClass,
        },
    },
    providers::Provider,
};
use std::sync::Arc;

use crate::{
    abigen::cartridge_account::{SignerSignature, WebauthnAssertion},
    felt_ser::to_felts,
};

// use super::{cairo_args::VerifyWebauthnSignerArgs, signers::device::DeviceError};

use crate::webauthn_signer::signers::Signer;

use super::cairo_args::find_value_index_length;

pub struct WebauthnAccount<P, S>
where
    P: Provider + Send,
    S: Signer + Send,
{
    provider: P,
    signer: S,
    address: FieldElement,
    chain_id: FieldElement,
    block_id: BlockId,
}
impl<P, S> WebauthnAccount<P, S>
where
    P: Provider + Send,
    S: Signer + Send,
{
    pub fn new(provider: P, signer: S, address: FieldElement, chain_id: FieldElement) -> Self {
        Self {
            provider,
            signer,
            address,
            chain_id,
            block_id: BlockId::Tag(BlockTag::Latest),
        }
    }
    pub async fn execution_signature(
        &self,
        execution: &RawExecution,
        query_only: bool,
    ) -> Result<SignerSignature, SignError> {
        let tx_hash = execution.transaction_hash(self.chain_id, self.address, query_only, self);
        let mut challenge = tx_hash.to_bytes_be().to_vec();

        // Cairo-1 sha256
        challenge.push(1);
        let response = self.signer.sign(&challenge).await?;

        let (type_offset, _) = find_value_index_length(&response.client_data_json, "type").unwrap();
        let (challenge_offset, challenge_length) =
            find_value_index_length(&response.client_data_json, "challenge").unwrap();
        let (origin_offset, origin_length) =
            find_value_index_length(&response.client_data_json, "origin").unwrap();

        let result = WebauthnAssertion {
            signature: response.signature,
            type_offset: type_offset as u32,
            challenge_offset: challenge_offset as u32,
            challenge_length: challenge_length as u32,
            origin_offset: origin_offset as u32,
            origin_length: origin_length as u32,
            client_data_json: response.client_data_json.into_bytes(),
            authenticator_data: response.authenticator_data.into(),
        };
        Ok(SignerSignature::Webauthn((
            self.signer.account_signer(),
            result,
        )))
    }
}

//starknet::accounts::Call really should implement serde::Serialize, at least as a crate feature
#[derive(Debug, Clone, Serialize)]
struct SerializableCall<'a> {
    pub to: &'a FieldElement,
    pub selector: &'a FieldElement,
    pub calldata: &'a Vec<FieldElement>,
}
impl<'a> From<&'a Call> for SerializableCall<'a> {
    fn from(call: &'a Call) -> Self {
        Self {
            to: &call.to,
            selector: &call.selector,
            calldata: &call.calldata,
        }
    }
}

impl<P, S> ExecutionEncoder for WebauthnAccount<P, S>
where
    P: Provider + Send,
    S: Signer + Send,
{
    fn encode_calls(&self, calls: &[Call]) -> Vec<FieldElement> {
        to_felts(&calls.iter().map(SerializableCall::from).collect::<Vec<_>>())
    }
}

#[derive(Debug, thiserror::Error)]
pub enum SignError {
    #[error("Signer error: {0}")]
    Signer(EcdsaSignError),
    // #[error("Device error: {0}")]
    // Device(DeviceError),
}

#[cfg_attr(not(target_arch = "wasm32"), async_trait)]
#[cfg_attr(target_arch = "wasm32", async_trait(?Send))]
impl<P, S> Account for WebauthnAccount<P, S>
where
    P: Provider + Send + Sync,
    S: Signer + Send + Sync,
{
    type SignError = SignError;

    fn address(&self) -> FieldElement {
        self.address
    }

    fn chain_id(&self) -> FieldElement {
        self.chain_id
    }

    async fn sign_execution(
        &self,
        execution: &RawExecution,
        query_only: bool,
    ) -> Result<Vec<FieldElement>, Self::SignError> {
        let result = self.execution_signature(execution, query_only).await?;
        Ok(Vec::<SignerSignature>::cairo_serialize(&vec![result]))
    }

    async fn sign_declaration(
        &self,
        _declaration: &RawDeclaration,
        _query_only: bool,
    ) -> Result<Vec<FieldElement>, Self::SignError> {
        unimplemented!("sign_declaration")
    }

    async fn sign_legacy_declaration(
        &self,
        _legacy_declaration: &RawLegacyDeclaration,
        _query_only: bool,
    ) -> Result<Vec<FieldElement>, Self::SignError> {
        unimplemented!("sign_legacy_declaration")
    }

    fn execute(&self, calls: Vec<Call>) -> Execution<Self> {
        Execution::new(calls, self)
    }

    fn declare(
        &self,
        contract_class: Arc<FlattenedSierraClass>,
        compiled_class_hash: FieldElement,
    ) -> Declaration<Self> {
        Declaration::new(contract_class, compiled_class_hash, self)
    }

    fn declare_legacy(&self, contract_class: Arc<LegacyContractClass>) -> LegacyDeclaration<Self> {
        LegacyDeclaration::new(contract_class, self)
    }
}

impl<P, S> ConnectedAccount for WebauthnAccount<P, S>
where
    P: Provider + Send + Sync,
    S: Signer + Send + Sync,
{
    type Provider = P;

    fn provider(&self) -> &Self::Provider {
        &self.provider
    }

    fn block_id(&self) -> BlockId {
        self.block_id
    }
}
