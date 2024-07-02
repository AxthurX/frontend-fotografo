import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";

const Legend = forwardRef<HTMLLegendElement, HTMLProps<HTMLLegendElement>>(
  ({ className, ...props }, ref) => {
    Legend.displayName;

    return (
      <legend
        ref={ref}
        className={cn(
          "min-h-12 mb-6 flex w-full items-center justify-center border-x-0 border-y border-sage-200 bg-beige-50 text-center text-lg font-semibold",
          className,
        )}
        {...props}
      />
    );
  },
);

export default Legend;
