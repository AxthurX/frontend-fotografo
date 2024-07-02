"use client";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container  border border-t-0 border-sage-300 bg-beige-100 p-0 max-sm:border-0">
      <div className="grid h-full grid-cols-1 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-10"></div>
      <div className="flex items-center justify-center">
          <Image
            src="/ext-files/website-icons/topo-psga.png"
            width={1200}
            height={400}
            alt="Logo da Gorvanança Climática para Rondônia"
            className="mx-auto w-full border-b-4 border-sage-600"
          />
      </div>
      <div className="flex flex-wrap justify-center bg-calpolygreen-900">
        <Link
          href={"/pgsa/sobre-psga"}
          className="mb-2 w-full md:mb-0 md:w-1/2 lg:w-1/5 xl:w-1/5"
        >
          <button className="mx-auto flex h-10 w-full items-center justify-center bg-primary p-3 text-center text-primary-content hover:bg-calpolygreen-950 focus:outline-none">
            Sobre PGSA
          </button>
        </Link>
        <Link
          href={"/pgsa/governanca"}
          className="mb-2 w-full md:mb-0 md:w-1/2 lg:w-1/5 xl:w-1/5"
        >
          <button className="mx-auto flex h-10 w-full items-center justify-center bg-primary p-3 text-center text-primary-content hover:bg-calpolygreen-950 focus:outline-none">
            Governança
          </button>
        </Link>
        <Link
          href={"/pgsa/sis-redd"}
          className="mb-2 w-full md:mb-0 md:w-1/2 lg:w-1/5 xl:w-1/5"
        >
          <button className="mx-auto flex h-10 w-full items-center justify-center bg-primary p-3 text-center text-primary-content hover:bg-calpolygreen-950 focus:outline-none">
            SIS REDD+
          </button>
        </Link>
        <Link
          href={"/post/cogeo-sala-de-situacao"}
          className="mb-2 w-full md:mb-0 md:w-1/2 lg:w-1/5 xl:w-1/5"
        >
          <button className="mx-auto flex h-10 w-full items-center justify-center bg-primary p-3 text-center text-primary-content hover:bg-calpolygreen-950 focus:outline-none">
            Monitoramento
          </button>
        </Link>
        <Link
          href={"/pgsa/funclima"}
          className="mb-2 w-full md:mb-0 md:w-1/2 lg:w-1/5 xl:w-1/5"
        >
          <button className="mx-auto flex h-10 w-full items-center justify-center bg-primary  text-center text-primary-content hover:bg-calpolygreen-950 focus:outline-none">
            Funclima
          </button>
        </Link>
      </div>
      <div className="">
        <div className="mb-10  h-20  bg-calpolygreen-900 text-beige-50">
          <h3 className="flex h-full w-full border-spacing-3 items-center justify-center border-t-4 border-sage-600 text-center align-middle text-2xl">
            Iniciativas
          </h3>
        </div>{" "}
        <div className="flex flex-wrap justify-center gap-8">
          <Link href="https://www.amazoniativa.com/br">
            <Image
              className=" border border-sage-200"
              src="/ext-files/website-icons/AMAZ-ATIVA.png"
              width={300}
              height={300}
              alt="Banner da Iniciativa Amazônia Ativa"
            />
          </Link>
          <Link href="https://www.gcftf.org/">
            <Image
              className=" border border-sage-200"
              src="/ext-files/website-icons/GCF-LATERAL.png"
              width={300}
              height={300}
              alt="Banner da GCF Task Force"
            />
          </Link>
          <Link href="https://www.theclimate.org/under2-coalition">
            <Image
              className=" border border-sage-200"
              src="/ext-files/website-icons/2-U.png"
              width={300}
              height={300}
              alt="Banner da Under2"
            />
          </Link>
        </div>
      </div>
      <div className="mb-10 mt-8">
        <div className="mt-10 h-20 border border-sage-600 bg-calpolygreen-900 text-beige-50">
          <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
            Parceiros
          </h3>
        </div>{" "}
        <div className="mb-10 mt-10 grid justify-items-center gap-8 text-center md:grid-cols-2 xl:grid-cols-5 xl:grid-rows-2">
          <Image
            src="/ext-files/website-icons/pnud.png"
            width={198}
            height={82}
            alt="Logo do Programa das Nações Unidas para o Desenvolvimento(PNUD)"
          />
          <Image
            src="/ext-files/website-icons/norad.png"
            width={198}
            height={82}
            alt="Logo da NORAD"
          />
          <Image
            src="/ext-files/website-icons/rio-terra.png"
            width={198}
            height={82}
            alt="Banner do Centro de Estudos Rioterra"
          />
          <Image
            src="/ext-files/website-icons/GIZ.png"
            width={198}
            height={82}
            alt="Banner GIZ"
          />
          <Image
            src="/ext-files/website-icons/GCF.png"
            width={198}
            height={82}
            alt="Logo da GCF"
          />
          <Image
            src="/ext-files/website-icons/idesam.png"
            width={198}
            height={82}
            alt="Logo da Idesam"
          />
          <Image
            src="/ext-files/website-icons/kaninde.png"
            width={198}
            height={82}
            alt="Logo da Kanindé - Associacão de Defesa Etnoambiental"
          />
          <Image
            src="/ext-files/website-icons/bvrio.png"
            width={198}
            height={82}
            alt="Logo da BVRIO"
          />
          <Image
            src="/ext-files/website-icons/pacto-das-aguas.png"
            width={198}
            height={82}
            alt="Logo do Pacto das Águas"
          />
          <Image
            src="/ext-files/website-icons/ecopore.png"
            width={198}
            height={82}
            alt="Logo da Ecorporé"
          />
        </div>
      </div>
    </div>
  );
}
