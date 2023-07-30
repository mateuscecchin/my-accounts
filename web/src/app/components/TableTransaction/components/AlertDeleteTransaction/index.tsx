"use client";

import { Trash2Icon } from "lucide-react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";

async function deleteTransaction(idTransaction: string) {
  const { token } = parseCookies();
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/transactions/${idTransaction}`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function AlertDeleteTransaction({
  idTransaction,
}: {
  idTransaction: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    await deleteTransaction(idTransaction);
    toast({
      title: "Transaction deleted !",
    });
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 flex w-full justify-between"
        >
          Remove
          <Trash2Icon width={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            transaction and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDelete}>Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
