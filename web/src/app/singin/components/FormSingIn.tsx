"use client";

import { min } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "~/components/custom/Form";
import { TextInput } from "~/components/custom/Form/TextInput";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { createUser } from "~/services/AuthApi";
import { useAuthStore } from "~/store/auth";
import { logIn } from "~/utils/logIn";

const schemeValidation = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

type SinginData = z.infer<typeof schemeValidation>;

export function FormSingIn() {
  const form = useForm<SinginData>();
  const setUser = useAuthStore((state: any) => state.setUser);
  const router = useRouter();

  async function handleSubmit(data: SinginData) {
    try {
      await createUser(data);
      const user = await logIn({ email: data.email, password: data.password });
      setUser(user);
      router.push("/");

      toast({
        title: "Account created!",
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Form {...form} onSubmit={handleSubmit} className="flex flex-col gap-3">
      <TextInput name="username" label="Username" />
      <TextInput type="email" name="email" label="Email" />
      <TextInput type="password" name="password" label="Password" />
      <Button className="mt-4">Create account</Button>
    </Form>
  );
}
