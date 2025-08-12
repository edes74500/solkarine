"use client";

import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Textarea } from "@repo/ui/components/textarea";
import { Control, Path } from "react-hook-form";

interface FormAreaTextProps<T extends Record<string, any>> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  height?: number;
}

export function FormAreaText<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  disabled = false,
  required = false,
  height = 4,
}: FormAreaTextProps<T>) {
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
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              value={field.value || ""}
              rows={height}
              //   cols={10}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
