import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

export default function ComponentProperties() {
    return (
        <>
            <h1>Component Properties</h1>

            <div className="grid grid-cols-4 gap-4 mt-4">
            {MEMBERS.map((info, index) => 
                <Profile key={index} info={info} />
            )}    
            </div>
        </>
    )
}

type ProfileInfo = {
    name: string
    phone: string
    email?: string
}

const MEMBERS:ProfileInfo[] = [
    {
        name : 'Aung Aung',
        phone : "09282872723",
        email : "aung@gmail.com"
    },
    {
        name : 'Maung Maung',
        phone : "09282872724",
    },
    {
        name : 'Thidar',
        phone : "09282872725",
    },
    {
        name : 'Nilar',
        phone : "09282872726",
        email : "nilar@gmail.com"
    },
    {
        name : 'Mya Mya',
        phone : "09282872727",
    }
]

function Profile({info} : {info : ProfileInfo}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{info.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2"><Phone size={16} /> {info.phone}</div>
                {info.email &&
                    <div className="flex items-center gap-2"><Mail size={16} /> {info.email}</div>
                }
            </CardContent>
        </Card>
    )
}

