"use client";

export default function SearchResultsError({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center border border-red-400">
        <div className="flex min-h-[420px] w-full flex-col items-center justify-center bg-red-200 text-center text-2xl font-semibold shadow-lg">
          Erro ao solicitar notícias recentes.
        </div>
        <div className="absolute bottom-4 flex w-full items-center justify-center align-middle">
          <button
            onClick={() => resetErrorBoundary()}
            className="ring-offset-red btn btn-outline border-red-300 bg-red-50 bg-opacity-50 text-xl text-coffee-950"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </>
  );
}
