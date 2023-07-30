import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormLogin } from "./components/FormLogin";

export default function LogIn() {
  return (
    <main className="container h-screen">
      <div className="flex h-full justify-center items-center">
        <Card className="flex w-96 flex-col">
          <CardHeader>
            <CardTitle className="text-center text-4xl">Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <FormLogin />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
