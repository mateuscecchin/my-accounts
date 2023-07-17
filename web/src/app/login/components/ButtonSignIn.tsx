"use client"

import Link from "next/link";
import { GoogleIcon } from "~/components/custom/GoogleIcon";
import { Button } from "~/components/ui/button";

export function ButtonSingIn() {

    return (
        <Link href={"http://localhost:8081/auth/google"}>
            <Button variant="outline" size="lg" className="flex justify-between w-full">
                <h1>
                    Sing in with google
                </h1>
                <GoogleIcon />
            </Button>
        </Link>
    )
}