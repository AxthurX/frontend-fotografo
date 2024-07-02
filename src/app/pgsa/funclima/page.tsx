import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Link from "next/link";

export default function Page() {
  return (
    <FormContainer className="">
      <Header>
        <Header.Title className="md:text-6xl">
          Fundo de Governança Climática e Serviços Ambientais – FUNCLIMA
        </Header.Title>
      </Header>
      <Separator className="mb-0 h-12 bg-sage-200" />
      <div className="mx-auto justify-center items-center text-center mb-20">
        <h2 className="text-xl mt-10 font-semibold">Decretos</h2>
        <ol className="ml-4 ">
          <Link href="/ext-files/sedam/2023/06/funclima-Copia.pdf">
            <li className="hover:text-blue-900 mt-5">
              1 - Decreto Nº 25 – 07/04/2021 – Dispõe sobre Fundo de Governança
              Climática e Serviços Ambientais – FUNCLIMA, e dá outras
              providências.
            </li>
          </Link>
        </ol>
      </div>
    </FormContainer>
  );
}
