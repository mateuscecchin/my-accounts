'use client'

import { useAuthStore } from "~/store/auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'



export default function Home() {
  const setUser = useAuthStore((state: any) => state.setUser)
  const searchParams = useSearchParams()
  const router = useRouter()
  const user_id = searchParams.get("userId")

  async function fetchUser() {
    try {
      const user = await fetch(`http://localhost:8081/user/${user_id}`)
      const userParsed = await user.json();

      console.log("userParsed", userParsed)

      setUser(userParsed)
      router.push("/dashboard")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!user_id) router.push("/login")
    fetchUser()
  }, [user_id])

  return (
    <div><h1>Loading...</h1></div>
  )

}
