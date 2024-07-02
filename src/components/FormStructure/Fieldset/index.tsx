import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";

const Fieldset = forwardRef<
  HTMLFieldSetElement,
  HTMLProps<HTMLFieldSetElement>
>(({ className, ...props }, ref) => {
  Fieldset.displayName;

  return (
    <fieldset ref={ref} className={cn("flex flex-col", className)} {...props} />
  );
});

export default Fieldset;
