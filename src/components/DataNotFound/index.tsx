import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const DataNotFound = () => {
  return (
    <div className="mb-10 flex flex-col items-center gap-4 text-center">
      <FaExclamationTriangle className="text-7xl text-primary" />
      <div className="flex text-center">
        Solicitação informada não existe ou não foi encontrada, tente novamente.
      </div>
      <Link className="btn flex w-auto px-5" href={"/area-usuario"}>
        Voltar à página anterior
      </Link>
    </div>
  );
};

export default DataNotFound;
