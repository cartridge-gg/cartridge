import {
  AccountDocument,
  AccountQuery,
  AccountQueryVariables,
} from "generated/graphql";
import { fetchData } from "hooks/fetcher";

// export function validateUsername(val: string) {
//   if (!val) {
//     return "Username required";
//   } else if (val.length < 3) {
//     return "Username must be at least 3 characters";
//   } else if (val.split(" ").length > 1) {
//     return "Username cannot contain spaces";
//   }
// }
//

export function validateUsernameFor(type: "signup" | "login") {
  return async (val: string) => {
    if (!val) {
      return "Username required";
    } else if (val.length < 3) {
      return "Username must be at least 3 characters";
    } else if (val.split(" ").length > 1) {
      return "Username cannot contain spaces";
    }

    try {
      const data = await fetchAccount(val);

      if (type === "signup" && data.account) {
        return "Account already exists";
      }
    } catch (error) {
      switch (type) {
        case "signup": {
          if ((error as Error).message === "ent: account not found") {
            return;
          } else {
            return "An error occured.";
          }
        }
        case "login": {
          if ((error as Error).message === "ent: account not found") {
            return "Account not found";
          } else {
            return "An error occured.";
          }
        }
      }
    }
  };
}

// async function validateUsername(val: string) {
//   if (!val) {
//     return "Username required";
//   } else if (val.length < 3) {
//     return "Username must be at least 3 characters";
//   } else if (val.split(" ").length > 1) {
//     return "Username cannot contain spaces";
//   }

//   try {
//     await fetchAccount(val);
//   } catch (error) {
//     if ((error as Error).message === "ent: account not found") {
//       return "Account not found";
//     } else {
//       return "An error occured.";
//     }
//   }
// }

export function fetchAccount(username: string) {
  return fetchData<AccountQuery, AccountQueryVariables>(AccountDocument, {
    id: username,
  });
}
