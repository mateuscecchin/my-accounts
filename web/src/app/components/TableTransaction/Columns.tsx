"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../DialogTransaction/FormTransaction";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatCurrency } from "~/utils/currency";
import { cva } from "class-variance-authority";
import { formatDate } from "~/utils/date";
import { ActionTrasaction } from "./components/ActionTransaction";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.getValue("type") as any;
      const formatted = formatCurrency(amount);

      return <div className={amountClass({ type })}>{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as any;
      const dateFormatted = formatDate(new Date(date));
      return <div className="text-right">{dateFormatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="flex justify-end">Actions</div>;
    },
    cell: ({ row }) => {
      const transaction = row.original as any;
      return (
        <div className="flex justify-end">
          <ActionTrasaction idTransaction={transaction.id} />
        </div>
      );
    },
  },
];

const amountClass = cva("text-right", {
  variants: {
    type: {
      PAID: "text-red-500 before:content-['-']",
      RECEIVED: "text-green-500",
    },
  },
});
