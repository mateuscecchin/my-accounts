import jwt from "jsonwebtoken";
import {
  LogInData,
  fetchUser,
  logIn as serviceLogIn,
} from "~/services/AuthApi";
import { setCookie } from "nookies";
import { toast } from "~/components/ui/use-toast";

export async function logIn({email, password}: LogInData) {
  const token = await serviceLogIn({
    email,
    password,
  });
  setCookie(null, "token", token, {
    maxAge: 60 * 60,
  });
  const user = await fetchUser();

  return user;
}
