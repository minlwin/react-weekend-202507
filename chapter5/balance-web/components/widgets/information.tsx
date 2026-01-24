export default function Information({label, value} : {label : string, value : string}) {
    return (
        <div>
            <label className="text-gray-600 text-sm">{label}</label>
            <div>{value}</div>
        </div>
    )
}