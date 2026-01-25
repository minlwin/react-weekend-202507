import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

type FormsTextareaProps<T extends FieldValues> = {
    name : Path<T>, 
    control: Control<T>
    label? : string, 
    placeholder? : string
    className?: string
    rows?: number
    cols?: number
}

export default function FormsTextarea<T extends FieldValues>({
    control, name, className, label, placeholder, rows, cols
} : FormsTextareaProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => 
            <Field className={className}>
                {label && 
                    <FieldLabel>{label}</FieldLabel>
                }
                <Textarea {...field} rows={rows} cols={cols} placeholder={placeholder || `Enter ${label || 'Input'}`} />
                {fieldState.invalid && 
                    <FieldError errors={[fieldState.error]} />
                }
            </Field>
        } />
    )
}