import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { ButtonHTMLAttributes, HTMLProps, forwardRef } from "react";

interface FieldArrayButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "remove" | "append";
}

const Wrapper = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => {
    Wrapper.displayName;

    return (
      <section
        ref={ref}
        className={cn("ml-2 mt-7 flex flex-col lg:mt-5", className)}
        {...props}
      />
    );
  },
);

const FieldArrayButton = (props: FieldArrayButtonProps) => {
  const { variant = "append", className, ...rest } = props;
  const ariaLabel =
    variant === "remove" ? "Remover linha" : "Adicionar nova linha";

  return (
    <div className="flex flex-col items-center">
      <button
        {...rest}
        type="button"
        aria-label={ariaLabel}
        className={cn(
          "btn " +
            (variant === "remove"
              ? "btn-error mt-2 px-3"
              : "btn-success mx-2 w-1/3 px-0 text-xl"),
          className,
        )}
      >
        {variant === "remove" ? (
          <Minus strokeWidth={4} />
        ) : (
          <Plus strokeWidth={4} />
        )}
      </button>
    </div>
  );
};

const FieldArrayButtonGroup = Object.assign(FieldArrayButton, {
  Wrapper: Wrapper,
});

export { FieldArrayButtonGroup as FieldArrayButton };
