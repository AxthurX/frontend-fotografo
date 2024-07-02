import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";

type FollowUpButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  link: string;
};

const FollowUpButton = forwardRef<HTMLButtonElement, FollowUpButtonProps>(
  ({ className, ...props }, ref) => {
    FollowUpButton.displayName;

    return (
      <button
        ref={ref}
        className={cn(
          "btn btn-secondary w-auto justify-center text-lg transition duration-300 ease-in-out max-sm:mb-4 max-sm:w-full sm:my-3",
          className,
        )}
        type="button"
        {...props}
      />
    );
  },
);

const FollowUpButtonGroup = Object.assign(FollowUpButton);

export { FollowUpButtonGroup as FollowUpButton };
