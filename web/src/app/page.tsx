import { ModeToggle } from "~/components/ui/mode-toggle";
import { DialogTransaction } from "./components/DialogTransaction";
import { CardTransaction } from "./components/CardTransaction";
import { TableTransaction } from "./components/TableTransaction";
import Logged from "./components/Logged";

export default function Home() {
  return (
    <main className="container">
      <Logged />
      <header className="flex justify-between py-12">
        <h1>My accounts</h1>
        <div className="flex gap-2">
          <DialogTransaction />
          <ModeToggle />
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-12">
        <CardTransaction type="payment" title="Payable" value="$1,200.89" aditional="+20.1% from last month" />
        <CardTransaction type="receive" title="Receivable" value="$45,231.89" aditional="+20.1% from last month" />
        <CardTransaction type="total" title="Total Revenue" value="$44,031.00" aditional="+20.1% from last month" />
      </div>
      <TableTransaction />
    </main>
  )
}
