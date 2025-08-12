"use client";

import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Control, Path } from "react-hook-form";

interface FormInputProps<T extends Record<string, any>> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

export function FormInput<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  type = "text",
  disabled = false,
  required = false,
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input placeholder={placeholder} type={type} disabled={disabled} {...field} value={field.value || ""} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
