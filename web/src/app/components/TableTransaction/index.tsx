import { cva } from "class-variance-authority";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatCurrency } from "~/utils/currency";
import { formatDate } from "~/utils/date";
import { ActionTrasaction } from "./ActionTransaction";

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
  return (await response.json()) as ITransaction[];
}

export async function TableTransaction() {
  const transactions = await fetchTransactions();
  return (
    <Table className="my-12">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {transaction.description}
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell className="capitalize">{transaction.type}</TableCell>
            <TableCell className={amount({ type: transaction.type as any })}>
              {formatCurrency(transaction.amount)}
            </TableCell>
            <TableCell className="text-right">
              {formatDate(new Date(transaction?.date))}
            </TableCell>
            <TableCell className="text-center">
              <ActionTrasaction idTransaction={transaction.id}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const amount = cva("text-right", {
  variants: {
    type: {
      payment: "text-red-500 before:content-['-']",
      receiment: "text-green-500",
    },
  },
});
