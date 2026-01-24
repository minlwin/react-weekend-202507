export default function InformationCard({label, value} : {label : string, value : number}) {
    return (
        <section className="flex flex-col items-center justify-center gap-2 bg-gray-200 w-full rounded-lg p-4">
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-gray-600 text-sm">{label}</div>
        </section>
    )
}