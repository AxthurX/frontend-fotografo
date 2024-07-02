import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";

type SubmitButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
};

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ className, ...props }, ref) => {
    SubmitButton.displayName;

    return (
      <button
        ref={ref}
        className={cn(
          "btn btn-primary w-32 justify-center text-lg transition duration-300 ease-in-out max-sm:w-full sm:my-2 sm:ml-auto",
          className,
        )}
        type="submit"
        {...props}
      />
    );
  },
);

const Wrapper = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    Wrapper.displayName;

    return (
      <div
        ref={ref}
        className={cn(
          "mx-6 flex items-center gap-2 max-sm:flex-col max-sm:justify-center",
          className,
        )}
        {...props}
      />
    );
  },
);

const SubmitButtonGroup = Object.assign(SubmitButton, { Wrapper: Wrapper });

export { SubmitButtonGroup as SubmitButton };
