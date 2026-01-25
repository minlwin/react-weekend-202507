import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LedgerListItem } from "@/lib/schema/member.ledger.schema";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LedgerSearchResult({list} : {list : LedgerListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Modified At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => 
                    <TableRow key={index}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.deleted ? "Deleted" : "Active"}</TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>{item.modifiedAt}</TableCell>
                        <TableCell>
                            <Link href={`/member/ledgers/${item.code}`}>
                                <ArrowRight />
                            </Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}