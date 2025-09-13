import { Card } from "@/components/ui/card"

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
    email: string
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
        email : "maung@gmail.com"
    },
    {
        name : 'Thidar',
        phone : "09282872725",
        email : "thidar@gmail.com"
    },
    {
        name : 'Nilar',
        phone : "09282872726",
        email : "nilar@gmail.com"
    },
    {
        name : 'Mya Mya',
        phone : "09282872727",
        email : "mya@gmail.com"
    }
]

function Profile({info} : {info : ProfileInfo}) {
    return (
        <Card></Card>
    )
}

