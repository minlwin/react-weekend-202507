import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type FormsInputPorps<T extends FieldValues> = {
    control : Control<T>
    path: Path<T>
    label: string
    type?: HTMLInputTypeAttribute
    className?: string
    placeHolder?: string
}

export default function FormsInput<T extends FieldValues>({
    control,
    path,
    label,
    type,
    className,
    placeHolder
} : FormsInputPorps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...field} type={type || 'text'} placeholder={placeHolder || `Enter ${label}`} />
                </FormControl>
                <FormMessage />
            </FormItem>
        } />
    )
}