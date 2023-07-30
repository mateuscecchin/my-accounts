import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormSingIn } from "./components/FormSingIn";

export default function SigIn() {
  return (
    <main className="container h-screen">
      <div className="flex h-full justify-center items-center">
        <Card className="flex w-96 flex-col">
          <CardHeader>
            <CardTitle className="text-center text-4xl">
              Create account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormSingIn />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
