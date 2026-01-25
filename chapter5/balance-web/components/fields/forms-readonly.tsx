import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function FormsReadonly({label, value} : {label : string, value : string}) {
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <Input readOnly value={value} />
        </Field>
    )
}