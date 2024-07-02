"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container border border-t-0 border-sage-300 bg-beige-100 p-0 max-sm:border-0">
      <div className="container bg-beige-100 p-0 max-sm:border-0">
        <div className="">
          <Link href="/pgsa/funclima">
            <Image
              src={encodeURI("/ext-files/website-icons/governança.png")}
              width={1400}
              height={300}
              alt="Logo da Governança Climática para Rondônia"
              className="mx-auto border border-sage-300"
            />
          </Link>
        </div>
        <div className="px-4 pt-10 md:px-8 lg:px-12 xl:px-40">
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">
            Compete ao Fórum Estadual de Mudanças Climática mobilizar e promover
            a participação das partes interessadas na implantação e no
            desenvolvimento da PGSA.
          </p>
          <p className="my-5 border border-l-[10px] border-sage-400 p-3 text-sm md:text-base lg:text-lg xl:text-xl">
            O Fórum Estadual de Mudanças Climáticas deverá ser consultado sobre
            a definição da linha de base, dos níveis de referência e das metas
            de redução das emissões de GEE e informado, periodicamente, sobre os
            demais aspectos da implementação da PGSA.
          </p>
        </div>
        <div className="px-4 pt-10 md:px-8 lg:px-12 xl:px-40">
          <h2 className="text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
            Decretos
          </h2>
          <ul className="ml-5 list-disc text-sm md:text-base lg:text-lg xl:text-xl">
            <li>
              <Link className="hover:text-blue-900" href="#">
                Decreto N° 24.497 – 27/11/2019 – Dispõe sobre o Fórum Estadual
                de Mudanças Climáticas, revoga o Decreto Estadual nº 16.232, de
                4 de outubro de 2011, e dá outras providências.
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-900" href="#">
                Decreto N° 25.967 – 7/4/2021 – Nomeia representantes do Fórum
                Estadual de Mudanças Climáticas e dá outras providências.
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-4 py-3 md:px-10 lg:px-20">
          <div className="mx-auto  mt-6 md:mt-10">
            <div className="rounded-lg bg-sage-200 px-4 py-3 shadow-md md:px-8 md:py-6">
              <h2 className="mb-4 text-lg font-semibold md:mb-6 md:text-xl lg:text-2xl">
                Atas
              </h2>
              <ul className="ml-4 list-disc md:ml-6">
                <ul className="ml-4 list-disc md:ml-6">
                  <li>
                    <a
                      className="mb-2 block hover:text-blue-900"
                      href="/ext-files/sedam/2023/10/Ata-1o-FEMC-RO_revDMR-2.docx.pdf"
                    >
                      2022
                    </a>
                  </li>
                  <li>
                    <a className="mb-2 block hover:text-blue-900" href="#">
                      2023
                    </a>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="mx-auto  mt-6 md:mt-10">
            <div className="rounded-lg bg-sage-200 px-4 py-3 shadow-md md:px-8 md:py-6">
              <h2 className="mb-4 text-lg font-semibold md:mb-6 md:text-xl lg:text-2xl">
                Composição
              </h2>
              <ul className="ml-4 list-disc md:ml-6">
                <li>
                  <Link
                    className="mb-2 block hover:text-blue-900"
                    href="/ext-files/sedam/2023/06/CamScanner-29-06-2023-12.09.pdf"
                  >
                    Fórum Rondoniense de Mudanças Climáticas
                  </Link>
                </li>
                <li>
                  <Link className="mb-2 block hover:text-blue-900" href="#">
                    Câmaras
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divide-y-4 divide-gray-300">
          <div className="px-4 py-3 md:px-10 lg:px-20">
            <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
              Resoluções
            </h2>
            <ul className="ml-5 list-disc">
              <li>
                <Link
                  className="hover:text-blue-900"
                  href="/ext-files/sedam/2023/06/SEI_0038479505_Resolucao_5_FEMC_RO-3.pdf"
                >
                  Resolução N° 5 – FEMC-RO – 2023 – Designa as instituições
                  representativas dos diferentes grupos da sociedade civil no
                  Conselho Gestor do Sistema Estadual de Governança Climática e
                  Serviços Ambientais.
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-16 mt-10 h-20 bg-calpolygreen-900 text-beige-50">
          <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
            Camaras temáticas
          </h3>
        </div>
        <div className="px-4 py-3 md:px-10 lg:px-20">
          <div className="mx-auto ">
            <div className="rounded-lg bg-sage-200 px-4 py-3 shadow-md md:px-8 md:py-6">
              <h2 className="mb-4 text-lg font-semibold md:mb-6 md:text-xl lg:text-2xl">
                Permanentes
              </h2>
              <ol className="ml-4 list-decimal md:ml-6">
                <li className="mb-2">
                  <Link
                    className="block hover:text-blue-900"
                    href="/ext-files/sedam/2023/06/DOE_25_05_2023_Camaras_Tematicas_FEMC_RO-PSA.pdf"
                  >
                    Câmara temática – Pagamento por Serviços Ambientais (CT-PSA)
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="block hover:text-blue-900"
                    href="/ext-files/sedam/2023/06/DOE_25_05_2023_Camaras_Tematicas_FEMC_RO-Salvaguardas.pdf"
                  >
                    Câmara temática – Salvaguardas (CT-Salvaguardas)
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="block hover:text-blue-900"
                    href="/ext-files/sedam/2023/06/DOE_25_05_2023_Camaras_Tematicas_FEMC_RO-CT-PICT.pdf"
                  >
                    Câmara temática – Povos Indígenas e Comunidades Tradicionais
                    (CT-PICT)
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="h-26 mb-16 mt-10 bg-calpolygreen-900 text-beige-50 md:h-20">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Conselho Gestor do Sistema Estadual de Governança Climática e Serviços
          Ambientais
        </h3>
      </div>

      <Image
        src={encodeURI("/ext-files/website-icons/CONSELHO-GESTOR-3.svg")}
        alt="Ornagrama do conselho Gestor"
        width={500}
        height={490}
        className="mx-auto"
      />

      <div className="px-4 py-3 md:px-10 lg:px-20">
        <div className="mx-auto ">
          <div className="divide-y-4 divide-gray-300">
            <div className="rounded-lg bg-sage-200 px-4 py-3 shadow-md md:px-8 md:py-6">
              <h2 className="mb-4 text-lg font-semibold md:mb-6 md:text-xl lg:text-2xl">
                Resoluções
              </h2>
              <ul className="ml-4 list-disc md:ml-6">
                <li className="mb-4 md:mb-6">
                  <Link
                    className="block hover:text-blue-900"
                    href="/ext-files/sedam/2023/06/SEI_0038479505_Resolucao_5_FEMC_RO-3.pdf"
                  >
                    Resolução N° 5 – FEMC-RO – 2023 – Designa as instituições
                    representativas dos diferentes grupos da sociedade civil no
                    Conselho Gestor do Sistema Estadual de Governança Climática
                    e Serviços Ambientais.
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16 h-20 bg-calpolygreen-900 text-beige-50">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Comitê científico
        </h3>
      </div>
      <Image
        src={encodeURI("/ext-files/website-icons/COMITE-CIENTIFICO-2.svg")}
        alt="Ornagrama do comitê cientítico"
        width={500}
        height={379}
        className="mx-auto mb-10"
      />
    </div>
  );
}
