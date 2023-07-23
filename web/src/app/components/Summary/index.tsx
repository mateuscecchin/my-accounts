import { cookies } from "next/headers";
import { formatCurrency } from "~/utils/currency";
import { CardSummary } from "./CardSummary";

async function fetchSummary() {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/transactions/summary`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}

export async function Summary() {
  const summary = await fetchSummary();
  return (
    <div className="grid md:grid-cols-3 gap-12">
      <CardSummary
        type="payment"
        title="Payable"
        value={formatCurrency(summary.payment)}
        // aditional="+20.1% from last month"
      />
      <CardSummary
        type="receive"
        title="Receivable"
        value={formatCurrency(summary.receiment)}
        // aditional="+20.1% from last month"
      />
      <CardSummary
        type="total"
        title="Total Revenue"
        value={formatCurrency(summary.total)}
        // aditional="+20.1% from last month"
      />
    </div>
  );
}
