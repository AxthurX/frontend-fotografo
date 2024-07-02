import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Image from "next/image";

export default function Page() {
  return (
    <FormContainer>
      <Header.Title>Projeto Carbono Reca</Header.Title>
      <Header.Body className="text-justify">
        <p className="mb-3 indent-4">
          O Projeto Carbono Reca é a primeira experiência de um modelo de
          “insetting” florestal no Brasil, liderado pela cooperativa RECA e a
          empresa Natura Cosméticos. O projeto visa criar um modelo de pagamento
          por serviços ambientais, voltados à conservação florestal e produção
          sustentável, através da produção e comercialização de produtos
          oriundos de plantios de Sistemas Agroflorestais (SAFs) e extrativismo
          de produtos florestais não madeireiros.
        </p>

        <div className="flex flex-wrap xl:flex-nowrap">
          <Image
            src={encodeURI("/ext-files/website-icons/projeto-carbono-reca.png")}
            alt="Mapa descritivo do Projeto Carbono Reca"
            width={672}
            height={957}
          />
          <table className="ml-4 w-full border-collapse divide-y divide-gray-500 text-left">
            <tr>
              <th>Ano de início</th>
              <td>2013</td>
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
              <td>RECA e Natura</td>
            </tr>
            <tr>
              <th>Hectares a serem conservados</th>
              <td>5.000 ha</td>
            </tr>
            <tr>
              <th>Emissões evitadas (tCO2eq)</th>
              <td>400.000 tCO2</td>
            </tr>
            <tr>
              <th>Benefícios esperados</th>
              <td>
                <p className="mb-3">
                  Apoio a produção rural sustentável, estruturação
                  agroindustrial e PSA para produtores
                </p>
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Em andamento</td>
            </tr>
          </table>
        </div>
      </Header.Body>
    </FormContainer>
  );
}
