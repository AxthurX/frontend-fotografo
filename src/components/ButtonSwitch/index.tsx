import { cn } from "@/lib/utils";

interface ButtonSwitchProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ButtonSwitch(props: ButtonSwitchProps) {
  return (
    <button
      className={cn("h-full w-full text-2xl text-beige-50", props.className)}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
