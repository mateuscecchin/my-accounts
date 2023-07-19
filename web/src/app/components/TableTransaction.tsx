import { cookies } from "next/headers";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useAuthStore } from "~/store/auth";

export async function TableTransaction() {
    // const user_id = useAuthStore((state: any) => state.user.id)
    // const [tableData, setTableData] = useState<IAccounts[]>([]);
    // const { token } = parseCookies();

    // async function fetchAccounts() {
    //     const data = await fetch(`http://localhost:8081/accounts/${user_id}`, {
    //         cache: "no-cache", headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     });
    //     const dataParsed = await data.json() as IAccounts[];
    //     setTableData(dataParsed)
    // }

    // useEffect(() => {
    //     fetchAccounts()
    // }, [])

    const user_id = useAuthStore.getState().user.id

    const token = cookies().get("token")?.value

    console.log("token", token)

    const data = await fetch(`http://localhost:8081/accounts/${user_id}`, {
        cache: "no-cache", headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const dataParsed = await data.json() as IAccounts[];


    return (
        <Table className="my-12">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataParsed.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.description}</TableCell>
                        <TableCell>{invoice.category}</TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell className="text-right">{invoice.price}</TableCell>
                        <TableCell className="text-right">{invoice.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}