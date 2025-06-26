import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center font-semibold rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-sm px-3 py-1",
        md: "text-base px-6 py-2",
        lg: "text-lg px-8 py-3",
      },
      intent: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline:
          "border border-blue-500 text-blue-500 bg-white hover:bg-blue-50",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "opacity-70 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "primary",
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, size, intent, fullWidth, loading, children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={clsx(
        buttonVariants({ size, intent, fullWidth, loading }),
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin mr-2 h-4 w-4 text-current"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
