import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MemberListItem } from "@/lib/schema/admin.member.schema";
import { ArrowRight, UserCheck, UserMinus } from "lucide-react";
import Link from "next/link";

export default function MemberSearchResult({list} : {list : MemberListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {list.map((item, index) => 
                    <TableRow key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.registeredAt}</TableCell>
                        <TableCell>
                            {item.disabled ? <UserMinus className="size-4" /> : <UserCheck className="size-4" />}
                        </TableCell>
                        <TableCell>
                            <Link href={`/admin/members/${item.id}`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}