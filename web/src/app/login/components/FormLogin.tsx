"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "~/components/custom/Form";
import { TextInput } from "~/components/custom/Form/TextInput";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useAuthStore } from "~/store/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logIn } from "~/utils/logIn";

const schemeValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LogInData = z.infer<typeof schemeValidation>;

export function FormLogin() {
  const setUser = useAuthStore((state: any) => state.setUser);
  const router = useRouter();
  const form = useForm<LogInData>({
    resolver: zodResolver(schemeValidation),
  });

  async function handleSubmit(data: LogInData) {
    try {
      const user = await logIn(data);
      setUser(user);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
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
        <Button type="button" variant="link">
          Create account
        </Button>
      </Link>
      {/* <ButtonSingInWithGoogle /> talvez algum dia */}
    </Form>
  );
}
