"use client";

import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Image from "next/image";


export default function PdseaiPage() {
  return (
    <>
      <FormContainer>
        <Header>
          <Header.Title>
            Projeto de Desenvolvimento Socioeconômico e Ambiental Integrado
          </Header.Title>

          <div className="group relative overflow-hidden rounded-2xl p-4">
            <Image
              src={"/ext-files/pdseai/img-pdseai.png"}
              alt="PDSEAI - Fundo amazônia - BNDES"
              width={1100}
              height={250}
            />
            <div className="absolute inset-0 -translate-x-[100%] bg-gradient-to-l from-calpolygreen-900 to-calpolygreen-700 transition-transform duration-700 group-hover:-translate-x-[0%]">
              <div className="mx-10 my-5 h-4/5 w-11/12 break-words border-l-2 border-white pl-4 text-white flex flex-col">
                <span className="mt-3 text-3xl font-medium">Objetivo</span>
                <p className="mt-2 text-lg">
                  Apoiar a gestão ambiental, incluindo ações voltadas para a
                  proteção das unidades de conservação estaduais, para a
                  consolidação do cadastro ambiental rural (CAR) e para o
                  fortalecimento da gestão ambiental municipal, de modo a
                  contribuir para o combate ao desmatamento e à degradação
                  florestal no estado de Rondônia.
                </p>
              </div>
            </div>
          </div>

          <Header.Body></Header.Body>
        </Header>
      </FormContainer>
    </>
  );
}

