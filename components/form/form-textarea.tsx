"use client";
import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import FormErrors from "./form-error";

type textAreaProps = {
  label?: string;
  id: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  errors?: Record<string, string[] | undefined>;
};

const FormTextArea = forwardRef<HTMLTextAreaElement, textAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      className,
      required,
      disabled,
      defaultValue = "",
      onBlur,
      errors,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700">
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            name={id}
            placeholder={placeholder}
            className={cn("resize-none text-sm p-3 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none", className)}
            required={required}
            disabled={disabled || pending}
            defaultValue={defaultValue}
            onBlur={onBlur}
            aria-describedby={`${id}-error`}
            ref={ref}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextArea.displayName = "formTextArea";

export default FormTextArea;
