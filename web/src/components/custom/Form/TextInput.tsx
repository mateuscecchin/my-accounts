import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useForm, useFormContext } from "react-hook-form"
import { Input } from "~/components/ui/input";
import { HTMLAttributes, InputHTMLAttributes } from "react";
import { InputProps } from "~/@types/Input";


export function TextInput({ name, label, description, className, ...props }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
    const form = useFormContext();
    return (
        <FormField
            control={form?.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...props} {...field} />
                    </FormControl>
                    {description && <FormDescription>
                        {description}
                    </FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}