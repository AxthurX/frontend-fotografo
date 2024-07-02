import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";

const Header = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    Header.displayName;

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[400px] flex-col items-center justify-center",
          className,
        )}
        {...props}
      />
    );
  },
);

const HeaderTitle = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  HeaderTitle.displayName;

  return (
    <span
      ref={ref}
      className={cn(
        "my-12 text-center text-4xl font-bold tracking-tighter md:px-4 md:text-7xl",
        className,
      )}
      {...props}
    />
  );
});

const HeaderBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    HeaderBody.displayName;
    return (
      <div
        ref={ref}
        className={cn("mx-4 mb-8 lg:mx-40", className)}
        {...props}
      />
    );
  },
);

const HeaderGroup = Object.assign(Header, {
  Title: HeaderTitle,
  Body: HeaderBody,
});

export { HeaderGroup as Header };
