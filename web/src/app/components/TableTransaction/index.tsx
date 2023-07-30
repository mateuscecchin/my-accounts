import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { fetchTransactions } from "~/services/TransactionsApi";

export async function TableTransaction() {
  const transactions = await fetchTransactions();
  return (
    <div className="mt-6">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
