"use client";
import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const FormSubmit = ({
    children,
    className,
    disabled,
    variant = "default"
}:Props) => {
    const { pending } = useFormStatus();
  return (
    <Button
        type="submit"
        className={cn(className)}
        disabled={disabled || pending}
        variant={variant}
        size={"sm"}
    >
        {children}
    </Button>
  )
}

export default FormSubmit