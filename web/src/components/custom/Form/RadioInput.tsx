'use client'

import { PropsWithChildren, useId } from "react";
import { useFormContext } from "react-hook-form";
import { InputProps } from "~/@types/Input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export function RadioInput({ name, label, description, children }: PropsWithChildren<InputProps>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            {children}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    {description && <FormDescription>{description}</FormDescription>}
                </FormItem>
            )}
        />
    )
}

export function RadioInputItem({ children, value }: PropsWithChildren<{ value: any }>) {
    const id = useId()
    return (
        <Label
            htmlFor={id}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
            <RadioGroupItem value={value} id={id} className="sr-only" />
            <div className="flex flex-col gap-4 items-center">
                {children}
            </div>
        </Label>
    )
}