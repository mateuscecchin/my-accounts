import jwt from "jsonwebtoken";
import {
  LogInData,
  fetchUser,
  logIn as serviceLogIn,
} from "~/services/AuthApi";
import { setCookie } from "nookies";

export async function logIn(data: LogInData) {
  const token = await serviceLogIn({
    email: data.email,
    password: data.password,
  });
  const tokenPayload: any = jwt.decode(token);
  setCookie(null, "token", token, {
    maxAge: 60 * 60,
  });
  const user = await fetchUser(tokenPayload.id);

  return user;
}
