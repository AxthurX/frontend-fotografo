"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CarouselError({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="relative w-full">
      <div className="h-[504px] max-w-[1400px] rounded-none">
        <div className="flex h-full w-full flex-col items-center justify-center border border-red-400 bg-red-200 text-center text-4xl shadow-lg">
          Erro ao solicitar notícias recentes.
        </div>
        <button
          disabled
          aria-disabled="true"
          className="ring-offset-red absolute left-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border border-red-300 bg-red-50 text-sm font-medium opacity-50 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300 max-sm:hidden max-sm:size-10"
        >
          <ArrowLeft className="size-6 max-sm:size-5" />
        </button>
        <button
          disabled
          aria-disabled="true"
          className="ring-offset-red absolute right-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border border-red-300 bg-red-50 text-sm font-medium opacity-50 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300 max-sm:hidden max-sm:size-10"
        >
          <ArrowRight className="size-6 max-sm:size-5" />
        </button>
        <div className="absolute bottom-4 flex w-full items-center justify-center align-middle">
          <button
            onClick={() => resetErrorBoundary()}
            className="ring-offset-red btn btn-outline border-red-300 bg-red-50 bg-opacity-50 text-xl text-coffee-950"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
