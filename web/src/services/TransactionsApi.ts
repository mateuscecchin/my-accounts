import { cookies } from "next/headers";
import { parseCookies } from "nookies";
import { Transaction } from "~/app/components/DialogTransaction/FormTransaction";

export async function fetchTransactions() {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/transactions`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return (await response.json()) as Transaction[];
}
