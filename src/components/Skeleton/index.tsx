import { Header } from "@/components/FormStructure/Header";
import { cn } from "@/lib/utils";
interface ISkeleton {
  className?: string;
}
export default function Skeleton({ className }: ISkeleton) {
  return (
    <Header.Body
      role="status"
      className="animate-pulse rounded border border-sage-100 bg-beige-50 p-4"
    >
      <div
        className={cn(
          "skeleton m-2.5 h-16 max-w-[200px] rounded-xl",
          className,
        )}
      />
      <div
        className={cn(
          "skeleton m-2.5 h-16 max-w-[350px] rounded-xl",
          className,
        )}
      />
      <div
        className={cn(
          "skeleton m-2.5 h-16 max-w-[250px] rounded-xl",
          className,
        )}
      />
      <div
        className={cn(
          "skeleton m-2.5 h-16 max-w-[200px] rounded-xl",
          className,
        )}
      />
      <div className={cn("skeleton m-2.5 h-16 rounded-xl", className)} />
    </Header.Body>
  );
}
