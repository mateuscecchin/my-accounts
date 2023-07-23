import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { FormTransaction } from "./FormTransaction";


export function DialogTransaction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-">
        <FormTransaction/>
      </DialogContent>
    </Dialog>
  )
}