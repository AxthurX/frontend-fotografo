import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { FC, forwardRef, HTMLProps } from "react";

const Card = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    Card.displayName;

    return (
      <div
        ref={ref}
        className={cn(
          "h-76 card card-compact w-64 transform rounded-lg border border-sage-200 bg-beige-50 shadow-lg transition-transform hover:scale-105",
          className,
        )}
        {...props}
      />
    );
  },
);

const CardImage: FC<ImageProps> = (props) => {
  return (
    <Image
      src={encodeURI(props.src as string)}
      alt={props.alt}
      height={props.height || 176}
      width={props.width || 256}
      className={cn(
        "h-44 w-full rounded-t-lg bg-white object-cover",
        props.className,
      )}
    />
  );
};

const CardBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    CardBody.displayName;

    return (
      <div
        ref={ref}
        className={cn("card-body h-32 !py-2.5", className)}
        {...props}
      />
    );
  },
);

const CardDescription = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  CardDescription.displayName;

  return (
    <div
      ref={ref}
      className={cn(
        "line-clamp-4 overflow-hidden overflow-ellipsis text-secondary",
        className,
      )}
      {...props}
    />
  );
});

const CardTitle = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    CardTitle.displayName;

    return (
      <span
        ref={ref}
        className={cn(
          "card-title justify-center text-lg !leading-5",
          className,
        )}
        {...props}
      />
    );
  },
);

const CardGroup = Object.assign(Card, {
  Image: CardImage,
  Body: Object.assign(CardBody, {
    Title: CardTitle,
    Description: CardDescription,
  }),
});

export { CardGroup as CardV2 };
