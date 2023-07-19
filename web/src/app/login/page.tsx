"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "~/components/custom/Form";
import { TextInput } from "~/components/custom/Form/TextInput";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useAuthStore } from "~/store/auth";
import { logIn } from "~/utils/logIn";

const schemeValidation = z.object({
  email: z.string().email(),
  password: z.string()
})

type LoginData = z.infer<typeof schemeValidation>

export default function LogIn() {
  const setUser = useAuthStore((state: any) => state.setUser)
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(schemeValidation)
  });

  async function handleSubmit(data: LoginData) {
    try {
      const user = await logIn(data)
      setUser(user)
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="container h-screen">
      <div className="flex h-full justify-center items-center">
        <Card className="flex w-96 flex-col">
          <CardHeader>
            <CardTitle className="text-center text-4xl">
              Log in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form} onSubmit={handleSubmit} className="flex flex-col gap-2">
              <TextInput type="email" name="email" label="Email" />
              <TextInput type="password" name="password" label="Password" />
              <Button className="mt-4">Log in</Button>
              <div className="flex items-center my-3 ">
                <Separator className="flex flex-1" />
                <h1 className="mx-4">or</h1>
                <Separator className="flex flex-1" />
              </div>
              <Link href="/singin" className="flex justify-center">
                <Button type="button" variant="link">Create account</Button>
              </Link>
              {/* <ButtonSingInWithGoogle /> talvez algum dia */}
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}