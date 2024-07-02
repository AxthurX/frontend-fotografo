"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    setIsHovered(true);
    timeoutRef.current = setTimeout(() => setShowText(true), 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowText(false);
    clearTimeout(timeoutRef.current);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.back()}
      className={cn(
        `btn-circle absolute z-[9999] flex w-12 items-center justify-start self-start border border-calpolygreen-700 bg-calpolygreen-800 p-2 text-center text-beige-50 transition-all duration-500 max-lg:hidden lg:left-5 lg:top-[50px] ${
          isHovered && "w-[108px]"
        }`,
        className,
      )}
    >
      <ChevronLeft
        className="-ml-1.5"
        size={36}
        aria-label="Voltar à página anterior"
      />
      {showText && (
        <span className="font-semibold duration-1000 animate-in fade-in">
          Voltar
        </span>
      )}
    </button>
  );
}
