"use client"
import { forwardRef } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import FormErrors from "./form-error"

interface FormInputProps {
    label?: string
    id: string
    type?: string
    placeholder?: string
    className?: string
    required?: boolean
    disabled?: boolean
    defaultValue?: string
    onBlur?:() => void
    errors?:Record<string, string[] | undefined>
}

export const FormInput = forwardRef<HTMLInputElement,FormInputProps>(({
    id, label, type, placeholder, className, required, disabled, defaultValue="", onBlur, errors
},ref)=>{

    const {pending} = useFormStatus()
    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {
                    label && <Label htmlFor={id}  className="text-xs font-semibold text-neutral-700">{label}</Label>
                }
                <Input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    className={cn("text-sm px-2 py-1 h-9 outline-none",className)}
                    required={required}
                    disabled={disabled || pending}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    aria-describedby={`${id}-error`}
                    ref={ref}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
})
FormInput.displayName = "FormInput";