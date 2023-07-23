'use client'

import { Form } from "~/components/custom/Form";
import { TextInput } from "~/components/custom/Form/TextInput";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { createUser, fetchUser } from "~/services/AuthApi";
import { logIn } from "~/utils/logIn";
import { useAuthStore } from "~/store/auth";
import { setCookie } from 'nookies'
import { toast } from "~/components/ui/use-toast";

const schemeValidation = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
})

type SinginData = z.infer<typeof schemeValidation>

export default function SigIn() {
  const form = useForm<SinginData>();
  const setUser = useAuthStore((state: any) => state.setUser)
  const router = useRouter();

  async function handleSubmit(data: SinginData) {
    try {
      const res = await createUser(data)
      const user = await logIn({ email: data.email, password: data.password })
      setUser(user)
      router.push("/")

      toast({
        title: "Account created !"
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (<main className="container h-screen">
    <div className="flex h-full justify-center items-center">
      <Card className="flex w-96 flex-col">
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            Create account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextInput name="username" label="Username" />
            <TextInput type="email" name="email" label="Email" />
            <TextInput type="password" name="password" label="Password" />
            <Button className="mt-4">Create account</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  </main>)
}



