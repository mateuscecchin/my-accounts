import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { AlertDeleteTransaction } from "../AlertDeleteTransaction";

export function ActionTrasaction({ idTransaction }: { idTransaction: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          Transaction
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDeleteTransaction idTransaction={idTransaction} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
