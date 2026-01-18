import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { Field, FieldError, FieldLabel } from "../ui/field"

type Option = {
    key: string
    value: string
}

type FormsSelectProps<T extends FieldValues> = {
    name : Path<T>, 
    control: Control<T>
    options: Option[]
    label? : string, 
    className? : string
}

export default function FormsSelect<T extends FieldValues>({
    name, control, options, label, className
} : FormsSelectProps<T>) {
    return (
        <Controller name={name} control={control} render={({field, fieldState}) => 
            <Field className={className}>
                {label && 
                    <FieldLabel>{label}</FieldLabel>
                }
                <NativeSelect {...field} >
                    {options.map((item, index) => 
                        <NativeSelectOption key={index} value={item.key}>{item.value}</NativeSelectOption>
                    )}
                </NativeSelect>
                {fieldState.invalid && 
                    <FieldError errors={[fieldState.error]} />
                }
            </Field>
        } />
    )
}