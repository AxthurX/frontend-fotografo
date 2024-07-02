import "@/styles/not-found.css";
import { BiError } from "react-icons/bi";

export default function NotFound() {
  return (
    <>
      <div className="body flex min-h-dvh items-center justify-center">
        <div className="w-[450px] flex-col items-center justify-center rounded-xl bg-primary bg-opacity-80 text-white shadow-xl">
          <div className="my-8 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <BiError size={128} />
            <h1 className="mb-4 text-4xl font-semibold">
              Página não encontrada
            </h1>
            <span className="mb-4 text-xl">
              Desculpe, a página que você está procurando não existe.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
