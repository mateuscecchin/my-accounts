"use client"

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Form } from "~/components/custom/Form";
import { TextInput } from "~/components/custom/Form/TextInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerInput } from "~/components/custom/Form/DatePickerInput";
import { RadioInput, RadioInputItem } from "~/components/custom/Form/RadioInput";
import { ArrowDown, ArrowUp } from "lucide-react"
import { useAuthStore } from "~/store/auth";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

const schemeValidation = z.object({
  description: z.string().min(1),
  price: z.string().min(1),
  date: z.date(),
  type: z.string()
})

type Invoice = z.infer<typeof schemeValidation>

export function DialogTransaction() {
  const router = useRouter();
  const user_id = useAuthStore(((state: any) => state.user.id))
  const { token } = parseCookies()
  const form = useForm<Invoice>({
    resolver: zodResolver(schemeValidation)
  })

  async function handleSubmit(data: Invoice) {
    const price = Number(data.price)
    try {
      const res = await fetch('http://localhost:8081/transactions/create', {
        method: "post",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...data, user_id, category: "", price })
      })
      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-">
        <Form {...form} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Create a invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice. Click save when {"you're"} done.
            </DialogDescription>
          </DialogHeader>
          <TextInput name="description" label="Description" />
          <TextInput name="price" label="Price" />
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
      </DialogContent>
    </Dialog>
  )
}