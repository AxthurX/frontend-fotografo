import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CarouselSkeleton() {
  return (
    <div className="relative w-full">
      <div className="skeleton h-[504px] max-w-[1400px] rounded-none">
        <button
          disabled
          aria-disabled="true"
          className="absolute left-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-beige-50 text-sm font-medium opacity-50 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300 max-sm:hidden max-sm:size-10"
        >
          <ArrowLeft className="size-6 max-sm:size-5" />
        </button>
        <button
          disabled
          aria-disabled="true"
          className="absolute right-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-beige-50 text-sm font-medium opacity-50 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300 max-sm:hidden max-sm:size-10"
        >
          <ArrowRight className="size-6 max-sm:size-5" />
        </button>
      </div>
    </div>
  );
}
