import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLProps, forwardRef } from "react";

const sectionVariants = cva(
  "mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:grid-cols-24 md:gap-2",
  {
    variants: {
      variant: {
        left: "xl:pl-2 xl:pr-1",
        right: "xl:pl-1 xl:pr-2",
        center: "xl:px-2",
        array:
          "grow grid-cols-1 gap-2 max-lg:border max-lg:border-sage-200 max-lg:p-2 px-0 mx-0",
      },
    },
    defaultVariants: { variant: "center" },
  },
);

const Section = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & VariantProps<typeof sectionVariants>
>(({ className, variant, ...props }, ref) => {
  Section.displayName;

  return (
    <section
      ref={ref}
      className={cn(sectionVariants({ variant }), className)}
      {...props}
    />
  );
});

export default Section;
