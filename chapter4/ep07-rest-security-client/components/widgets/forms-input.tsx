import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { HTMLInputTypeAttribute } from "react"

type FormsInputProps<T extends FieldValues> = {
    control: Control<T>,
    path: Path<T>
    label?: string
    type?: HTMLInputTypeAttribute
    className?: string
}

export default function FormsInput<T extends FieldValues>({control, path, label, type, className} : FormsInputProps<T>) {
    return (
        <Controller control={control} name={path} render={({field, fieldState}) => 
            <Field className={className} data-invalid={fieldState.invalid}>
                {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
                <Input id={field.name} type={type} {...field} aria-invalid={fieldState.invalid} autoComplete="off" placeholder={`Enter ${label || 'Field'}`} />
                {fieldState.invalid && 
                    <FieldError>{fieldState.error?.message}</FieldError>
                }
            </Field>
        } />
    )
}