import Link from "next/link";
import { GoogleIcon } from "~/components/custom/GoogleIcon";
import { Button } from "~/components/ui/button";

export function ButtonSingInWithGoogle() {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}>
      <Button
        variant="outline"
        size="lg"
        className="flex justify-between w-full"
      >
        <h1>Sing in with google</h1>
        <GoogleIcon />
      </Button>
    </Link>
  );
}
