import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type FormsInputProps<T extends FieldValues> = {
    name : Path<T>, 
    control: Control<T>
    label? : string, 
    type?: HTMLInputTypeAttribute,
    placeholder? : string
    className?: string
}

export default function FormsInput<T extends FieldValues>({label, name, control, placeholder, type, className} : FormsInputProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => 
            <Field className={className}>
                {label && 
                    <FieldLabel>{label}</FieldLabel>
                }
                <Input {...field} type={type} autoComplete="off" placeholder={placeholder || `Enter ${label || 'Input'}`} />
                {fieldState.invalid && 
                    <FieldError errors={[fieldState.error]} />
                }
            </Field>
        } />
    )
}