import { ModeToggle } from "~/components/ui/mode-toggle";
import { DialogTransaction } from "./components/DialogTransaction";
import { TableTransaction } from "./components/TableTransaction";
import { Summary } from "./components/Summary";

export default function Home() {
  return (
    <main className="container">
      <header className="flex justify-between py-12">
        <h1>My accounts</h1>
        <div className="flex gap-2">
          <DialogTransaction />
          <ModeToggle />
        </div>
      </header>
      <Summary />
      <TableTransaction />
    </main>
  );
}
