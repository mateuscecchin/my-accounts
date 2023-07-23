import { cookies } from "next/headers";

export function getTokenSSR() {
  return cookies().get("token")?.value
}