import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ButtonSingIn } from "./components/ButtonSignIn";

export default function Login() {
    return (
        <main className="container h-screen">
            <div className="flex h-full justify-center items-center">
                <Card className="flex w-96 flex-col">
                    <CardHeader>
                        <CardTitle className="text-center text-4xl">
                            Sing In
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ButtonSingIn />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}