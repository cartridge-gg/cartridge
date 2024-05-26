import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Authenticate as AuthComponent } from "components/Auth";

// auth page used for externally embedded keychain
const Authenticate: NextPage = () => {
  const router = useRouter();
  const { name, action } = router.query as { name: string; action: string };

  return (
    <AuthComponent
      name={decodeURIComponent(name)}
      action={decodeURIComponent(action) as "login" | "signup"}
      onSuccess={() => {
        if (window.opener) {
          return window.close();
        }

        router.replace(`${process.env.NEXT_PUBLIC_ADMIN_URL}/profile`);
      }}
    />
  );
};

export default Authenticate;
