import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLProps, forwardRef } from "react";

const separatorVariants = cva(
  "mb-4 mt-2 h-3 border-x-0 border-y border-sage-200 bg-beige-50",
  {
    variants: {
      sizing: {
        xs: "h-2",
        sm: "h-3",
      },
    },
    defaultVariants: {
      sizing: "sm",
    },
  },
);

const Separator = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & VariantProps<typeof separatorVariants>
>(({ className, sizing, ...props }, ref) => {
  Separator.displayName;

  return (
    <div
      ref={ref}
      className={cn(separatorVariants({ sizing }), className)}
      {...props}
    />
  );
});

export default Separator;
