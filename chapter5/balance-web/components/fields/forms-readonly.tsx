import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function FormsReadonly({label, value, className} : {label? : string, value : string | number, className? : string}) {
    return (
        <Field className={className}>
            {label && 
                <FieldLabel>{label}</FieldLabel>
            }
            <Input readOnly value={value} />
        </Field>
    )
}