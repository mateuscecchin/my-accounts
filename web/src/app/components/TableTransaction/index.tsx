import { cookies } from "next/headers";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { Transaction } from "../DialogTransaction/FormTransaction";

async function fetchTransactions() {
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

export async function TableTransaction() {
  const transactions = await fetchTransactions();
  return (
    <div className="mt-6">
      <DataTable columns={columns} data={transactions}/>
    </div>
  );
}

