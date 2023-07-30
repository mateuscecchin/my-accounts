import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Props {
  columns: number;
  rows: number;
}
export async function TableSkeleton({ columns, rows }: Props) {
  return (
    <>
      <Table className="animate-pulse">
        <TableHeader>
          <TableRow>
            {Array.from({ length: rows }).map((_, index) => (
              <TableHead key={index}>
                <div className="w-32 h-4 bg-gray-300 rounded-full dark:bg-gray-700"></div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: rows }).map((_, index) => (
                <TableCell key={index}>
                  <div className="w-32 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
