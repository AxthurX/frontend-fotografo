import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Image from "next/image";

export default function Page() {
  return (
    <FormContainer>
      <Header.Title>Florestal Suruí</Header.Title>
      <Header.Body className="text-justify">
        <p className="mb-3 indent-4">
          O Projeto de Carbono Florestal Suruí (PCFS) é o primeiro projeto de
          REDD+ proposto em Terras Indígenas no mundo e consiste na proteção da
          terra indígena (TI) Sete de Setembro, localizada entre os Estados de
          Rondônia e Mato Grosso. A região se encontra atualmente bastante
          ameaçada por invasões, extração ilegal de madeira e desmatamento para
          implantação de pastagens e agricultura.
        </p>
        <p className="mb-3 indent-4">
          A meta é conservar a área de 13 mil hectares de mata e evitar a
          emissão de cerca de 7 milhões de toneladas de CO2 até 2038.
        </p>

        <div className="flex flex-wrap xl:flex-nowrap">
          <Image
            src={encodeURI(
              "/ext-files/website-icons/projeto-de-carbono-florestal-surui.png",
            )}
            alt="Mapa descritivo do Projeto de Carbono Florestal Suruí"
            width={768}
            height={555}
          />
          <table className="ml-4 w-full border-collapse divide-y divide-gray-500 text-left">
            <tr>
              <th>Ano de início</th>
              <td>2009</td>
            </tr>
            <tr>
              <th>Duração(anos)</th>
              <td>30</td>
            </tr>
            <tr>
              <th>Escopo setorial</th>
              <td>REDD</td>
            </tr>
            <tr>
              <th>Proponentes</th>
              <td>Povo Paiter Suruí</td>
            </tr>
            <tr>
              <th>Hectares a serem conservados</th>
              <td>13.575 ha</td>
            </tr>
            <tr>
              <th>Emissões evitadas (tCO2eq)</th>
              <td>7M tCO2</td>
            </tr>
            <tr>
              <th>Benefícios esperados</th>
              <td>
                <p className="mb-3">
                  Benefício as comunidades, aldeias e associações locais +
                  proteção das florestas e biodiversidade
                </p>
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Suspenso</td>
            </tr>
          </table>
        </div>
      </Header.Body>
    </FormContainer>
  );
}
