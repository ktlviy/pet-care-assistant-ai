import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const inputVariants = cva(
  "border outline-none transition px-4 py-2 rounded-full text-base bg-white text-gray-900 placeholder:text-gray-400",
  {
    variants: {
      size: {
        sm: "text-sm py-1 px-3",
        md: "text-base py-2 px-4",
        lg: "text-lg py-3 px-5",
      },
      intent: {
        default: "border-gray-300 focus:border-blue-500",
        error: "border-red-500 focus:border-red-600",
        success: "border-green-500 focus:border-green-600",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "default",
    },
  }
);

type InputOwnProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      keyof InputOwnProps
    >,
    InputOwnProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, intent, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(inputVariants({ size, intent }), className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input, inputVariants };
