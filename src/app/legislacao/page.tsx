import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Link from "next/link";

export default function Legislacao() {
  return (
    <FormContainer className="flex-grow">
      <Header className="min-h-[auto]">
        <Header.Title>Legislação</Header.Title>
      </Header>
      <Separator className="h-12 bg-sage-200" />
      <Header.Body>
        <div className="container mb-10 mt-10 grid grid-cols-1 gap-4">
          <Link
            href="/ext-files/files/legislacao/pela_Lei_Complementar_n__42_de_19.03._1991___INSTITUI__A_CRIACAO_DA_SEDAM.pdf"
            target="_blank"
            prefetch={false}
            className="card bg-secondary text-2xl font-semibold text-beige-50 shadow-md transition-transform hover:scale-[102%]"
          >
            <div className="card-body w-full">
              <p>Lei Complementar nº 42, de 1991: Criação da SEDAM</p>
            </div>
          </Link>
          <Link
            href="/ext-files/files/legislacao/institucional_legislacao_lei-de-reformulacao-da-sedam-lei-complementar-827-2015.pdf"
            target="_blank"
            prefetch={false}
            className="card bg-secondary text-2xl font-semibold text-beige-50 shadow-md transition-transform hover:scale-[102%]"
          >
            <div className="card-body w-full">
              <p>Lei Complementar nº 827, de 2015: Reformulação da SEDAM</p>
            </div>
          </Link>
          <Link
            href="/ext-files/files/legislacao/LC1180.pdf"
            target="_blank"
            prefetch={false}
            className="card bg-secondary text-2xl font-semibold text-beige-50 shadow-md transition-transform hover:scale-[102%]"
          >
            <div className="card-body w-full">
              <p>
                Lei Complementar nº 1.180, de 2023: Reforma Administrativa da
                SEDAM
              </p>
            </div>
          </Link>
          <Link
            href="/ext-files/files/legislacao/PORTARIA-278-ATRIBUIÇÕES-ERGAS.pdf"
            target="_blank"
            prefetch={false}
            className="card bg-secondary text-2xl font-semibold text-beige-50 shadow-md transition-transform hover:scale-[102%]"
          >
            <div className="card-body w-full">
              <p>Portaria nº 278: Atribuições dos Escritórios Regionais</p>
            </div>
          </Link>
          <Link
            href="/ext-files/files/legislacao/Portaria-229-SEDAM-Uso-do-Fogo.pdf"
            target="_blank"
            prefetch={false}
            className="card bg-secondary text-2xl font-semibold text-beige-50 shadow-md transition-transform hover:scale-[102%]"
          >
            <div className="card-body w-full">Portaria nº 229: Uso de Fogo</div>
          </Link>
        </div>
      </Header.Body>
    </FormContainer>
  );
}
