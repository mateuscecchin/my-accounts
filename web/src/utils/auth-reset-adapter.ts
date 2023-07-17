import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import { BASEUrl } from "./fetch";

export function AuthRestAdapter(): Adapter<true> {
  return {
    createUser: async (user: Omit<AdapterUser, "id">) => {
      const response = await fetch(`${BASEUrl}/sign-in`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      }).then(async (res) => res.json());

      return format<AdapterUser>(response.data);
    },
    getUserByEmail: async (email: string) => {
      const response = await fetch(`${BASEUrl}/user-by-email?email=${email}`, {
        headers: {
          "Content-type": "application/json",
        },
      }).then(async (res) => res.json());

      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    getUserByAccount: async ({
      providerAccountId,
      provider,
    }: Pick<AdapterAccount, "provider" | "providerAccountId">) => {
      const response = await fetch(
        `${BASEUrl}/account/${provider}/${providerAccountId}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then(async (res) => res.json());

      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    getUser: async (id: string) => {
      const response = await fetch(`${BASEUrl}/user?id=${id}`, {
        headers: {
          "Content-type": "application/json",
        },
      }).then(async (res) => res.json());

      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    updateUser: async (
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ) => {
      const response = await fetch(`${BASEUrl}/user`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(async (res) => res.json());

      return format<AdapterUser>(response.data);
    },
    deleteUser: async (userId: string) => {
      const response = await fetch(`${BASEUrl}/user?id=${userId}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
        },
      }).then(async (res) => res.json());

      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    linkAccount: async (account: AdapterAccount) => {
      const response = await fetch(`${BASEUrl}/account`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(account),
      }).then(async (res) => res.json());

      return response.data
        ? format<AdapterAccount>(response.data)
        : response.data;
    },
    unlinkAccount: async ({
      providerAccountId,
      provider,
    }: Pick<AdapterAccount, "provider" | "providerAccountId">) => {
      const response = await fetch(
        `${BASEUrl}/account/${provider}/${providerAccountId}`,
        {
          method: "delete",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then(async (res) => res.json());

      return response.data
        ? format<AdapterAccount>(response.data)
        : response.data;
    },
    createSession: async (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) => {
      const response = await fetch(`${BASEUrl}/session`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(session),
      }).then(async (res) => res.json());

      return response.data
        ? format<AdapterSession>(response.data)
        : response.data;
    },
    getSessionAndUser: async (sessionToken: string) => {
      const response = await fetch(`${BASEUrl}/session/${sessionToken}`, {
        headers: {
          "Content-type": "application/json",
        },
      }).then(async (res) => res.json());

      if (!response.data) {
        return response.data;
      }

      const session = format<AdapterSession>(response.data.session);
      const user = format<AdapterUser>(response.data.user);
      return { session, user };
    },
    updateSession: async (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ) => {
      const response = await fetch(`${BASEUrl}/session`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(session),
      }).then(async (res) => res.json());

      return response.data
        ? format<AdapterSession>(response.data)
        : response.data;
    },
    deleteSession: async (sessionToken: string) => {
      const response = await fetch(`${BASEUrl}/session/${sessionToken}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
        },
      }).then(async (res) => res.json());

      return response.data
        ? format<AdapterSession>(response.data)
        : response.data;
    },
    createVerificationToken: async (verificationToken: VerificationToken) => {
      const response = await fetch(`${BASEUrl}/verification`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verificationToken),
      }).then(async (res) => res.json());

      return response.data
        ? format<VerificationToken>(response.data)
        : response.data;
    },
    useVerificationToken: async (params: {
      identifier: string;
      token: string;
    }) => {
      const response = await fetch(`${BASEUrl}/verification`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(params),
      }).then(async (res) => res.json());

      return response.data
        ? format<VerificationToken>(response.data)
        : response.data;
    },
  };
}

function format<T>(obj: Record<string, unknown>): T {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const newResult = result;

    if (value === null) {
      return newResult;
    }

    if (isDate(value)) {
      newResult[key] = new Date(value);
    } else {
      newResult[key] = value;
    }

    return newResult;
  }, {} as Record<string, unknown>) as T;
}

const isDate = (value: unknown): value is string =>
  typeof value === "string"
    ? new Date(value).toString() !== "Invalid Date" &&
      !Number.isNaN(Date.parse(value))
    : false;
