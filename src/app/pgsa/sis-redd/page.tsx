import { Header } from "@/components/FormStructure/Header";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container border border-t-0 border-sage-300 bg-beige-100 p-0 max-sm:border-0">
      <Header>


        <Header.Title>SIS REDD+</Header.Title>
        <div className="px-4 md:px-8 lg:px-12 xl:px-40">
          <p className="text-center md:text-left">
            <Link href="#" className="text-indigo-800">
              Estratégia Operacional REDD+ Rondônia
            </Link>{" "}
            – Análises técnicas iniciais voltadas a avaliar e estimar o potencial
            de geração de reduções de emissões no estado de Rondônia, a partir do
            mecanismo de REDD+ (Redução de Emissões do Desmatamento e Degradação
            Florestal, manejo florestal sustentável, conservação e aumento de
            estoques de carbono florestais).
          </p>
        </div>
      </Header>

      <div className="mb-16 mt-10 h-20 border border-sage-600  bg-calpolygreen-900 text-beige-50">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Sistema Estadual de Salvaguardas
        </h3>
      </div>
      <Image
        src={encodeURI("/ext-files/website-icons/SALVAGUARDAS.svg")}
        alt="Ornagrama do Sistema estadual de Salvaguardas"
        width={800}
        height={836}
        className="mx-auto mb-10"
      />
      <div className="mb-16 mt-10 h-20 border border-sage-600  bg-calpolygreen-900 text-beige-50">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Estratégia de REDD+
        </h3>
      </div>
      <div className="mb-10 mt-4">
        <div className="grid justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          <div>
            <h2 className="text-center text-lg font-semibold">REDD+ Jacundá</h2>
            <Link href="/post/sedam-projeto-redd-rio-preto-jacunda-biofilica-ro">
              <Image
                src={encodeURI("/ext-files/website-icons/redd-jacunda.png")}
                width={300}
                height={300}
                alt="Banner da Redd+ Jacundá"
              />
            </Link>
          </div>
          <div>
            <h2 className="text-center text-lg font-semibold">Carbono Reca</h2>
            <Link href="/post/sedam-projeto-carbono-reca">
              <Image
                src={encodeURI("/ext-files/website-icons/carbono-reca.png")}
                width={300}
                height={300}
                alt="Banner da Carbono Reca"
              />
            </Link>
          </div>
          <div>
            <h2 className="text-center text-lg font-semibold">REDD+ Manoa</h2>
            <Link href="/post/sedam-projeto-redd-manoa">
              <Image
                src={encodeURI("/ext-files/website-icons/redd-manoa.png")}
                width={300}
                height={300}
                alt="Banner da Redd+ Manoa"
              />
            </Link>
          </div>
          <div>
            <h2 className="text-center text-lg font-semibold">
              Florestal Suruí
            </h2>
            <Link href="/post/sedam-projeto-de-carbono-florestal-surui">
              <Image
                src={encodeURI("/ext-files/website-icons/florestal-surui.png")}
                width={300}
                height={300}
                alt="Banner da Florestal Suruí"
              />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
