'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { z } from "zod";
import { Form } from "~/components/custom/Form";
import { DatePickerInput } from "~/components/custom/Form/DatePickerInput";
import { RadioInput, RadioInputItem } from "~/components/custom/Form/RadioInput";
import { TextInput } from "~/components/custom/Form/TextInput";
import { Button } from "~/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { toast } from "~/components/ui/use-toast";
import { useForm } from "react-hook-form";

const schemeValidation = z.object({
  description: z.string().min(1),
  amount: z.string().min(1),
  date: z.date(),
  type: z.string()
})

type Invoice = z.infer<typeof schemeValidation>

export function FormTransaction() {
  const router = useRouter();
  const { token } = parseCookies()
  const form = useForm<Invoice>({
    resolver: zodResolver(schemeValidation)
  })

  async function handleSubmit(data: Invoice) {
    const amount = Number(data.amount)
    try {
       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, category: "", amount })
      })
      toast({
        title: "Transaction created !",
      })
      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form {...form} onSubmit={handleSubmit} className="flex flex-col gap-4">
    <DialogHeader>
      <DialogTitle>Create a invoice</DialogTitle>
      <DialogDescription>
        Create a new invoice. Click save when {"you're"} done.
      </DialogDescription>
    </DialogHeader>
    <TextInput name="description" label="Description" />
    <TextInput name="amount" label="Amount" />
    <DatePickerInput name="date" label="Date" />
    <RadioInput name="type" label="Select a type of transaction">
      <div className="grid grid-cols-2 gap-4">
        <RadioInputItem value="payment">
          <ArrowDown className="text-red-500" />
          <p>Payment</p>
        </RadioInputItem>
        <RadioInputItem value="receiment">
          <ArrowUp className="text-green-500" />
          <p>Receiment</p>
        </RadioInputItem>
      </div>
    </RadioInput>
    <DialogFooter>
      <DialogTrigger asChild>
        <Button type="submit">Create</Button>
      </DialogTrigger>
    </DialogFooter>
  </Form>
  )
}