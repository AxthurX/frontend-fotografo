export default function PostError() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex h-[370px] w-full flex-col items-center justify-center rounded-lg border border-red-400 bg-red-200 text-center text-2xl shadow-lg">
        Erro ao solicitar notícias recentes.
      </div>
    </div>
  );
}
