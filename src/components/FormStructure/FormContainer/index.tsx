import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";

const FormContainer = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    FormContainer.displayName;

    return (
      <div
        ref={ref}
        className={cn(
          "container divide-y border-sage-300 bg-beige-100 p-0 max-sm:border-0 xl:border xl:border-t-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export default FormContainer;
