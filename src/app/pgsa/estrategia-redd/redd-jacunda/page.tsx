import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Image from "next/image";

export default function Page() {
  return (
    <FormContainer>
      <Header.Title>REDD+ Jacundá</Header.Title>
      <Header.Body className="text-justify">
        <p className="mb-3 indent-4">
          O projeto REDD+ Rio Preto-Jacundá é uma parceria entre a Biofílica e
          moradores da Reserva Extrativista Estadual Rio Preto-Jacundá,
          representada por respectiva associação (Asmorex), tendo o Centro de
          Estudos Rioterra e o Conselho Executivo das Reservas Extrativistas do
          Vale do Anari como parceiros no plajamento e implementação das
          atividades do Projeto. Localizado na reserva extrativista de mesmo
          nome nos municípios de Machadinho D´Oeste e Cujubim, nordeste do
          Estado de Rondônia, a Resex Rio Preto-Jacundá tem um território de 95
          mil hectares. Criada em 1996 pelo decreto estadual 7.336 tem uma
          história de luta pelos diretos dos seringueiros. A principal meta do
          Projeto de REDD+ Resex Rio Preto-Jacundá é promover a sustentabilidade
          da comunidade extrativista através da redução da degradação da
          floresta e desmatamento não planejado e ilegal e consequente emissão
          de gases de efeito estufa (GEE), atingido através da lista de
          atividades financiadas pela venda de créditos de carbono.
        </p>

        <Image
          src={encodeURI("/ext-files/website-icons/projeto-redd-jacunda.jpg")}
          alt="
        mapa descritivo do Projeto REDD+ Rio Preto-Jacundá (Biofílica – RO)"
          width={623}
          height={440}
          className="mx-auto my-7"
        />

        <table className="w-full border-collapse divide-y divide-gray-500 text-left">
          <tr>
            <th>Ano de início</th>
            <td>2012</td>
          </tr>
          <tr>
            <th>Duração(anos)</th>
            <td>30</td>
          </tr>
          <tr>
            <th>Escopo setorial</th>
            <td>14 – Agricultura, Floresta e Outros Usos da Terra (Afolu)</td>
          </tr>
          <tr>
            <th>Certificação</th>
            <td>VCS e CCB (selo ouro para comunidade e biodiversidade)</td>
          </tr>
          <tr>
            <th>Metodologia</th>
            <td>VM0015 Methodology for Avoided Unplanned Deforestation</td>
          </tr>
          <tr>
            <th>Proponentes</th>
            <td>
              Biofílica e Associação dos Moradores de reserva extrativista Rio
              Preto Jacundá e Ribeirinhos do Rio Machado – ASMOREX
            </td>
          </tr>
          <tr>
            <th>Hectares a serem conservados</th>
            <td>35.222 ha</td>
          </tr>
          <tr>
            <th>Emissões evitadas (tCO2eq)</th>
            <td>12.367.970 tCO2</td>
          </tr>
          <tr>
            <th>Benefícios esperados</th>
            <td>
              <p className="mb-3 indent-4">
                Para o clima: total de emissões evitadas pelo projeto de
                12.367.970 tCO2eq. No cenário com o projeto é evitado um
                desmatamento de 35.222 hectares ao longo dos 30 anos.
              </p>
              <p className="mb-3 indent-4">
                Para a Comunidade: promoção do bem-estar social dos 130
                moradores da Resex e valorização do modo de vida extrativista
                por meio de atividades desenvolvidas e fomentadas pelo projeto
                REDD+, sendo algumas delas:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Organização social: Capacitações e treinamentos mensais com a
                  diretoria da Asmorex relacionados a gestão e finanças;
                  estruturação de comitês internos formados por moradores nos
                  seguintes assuntos: saúde e educação, infraestrutura e
                  segurança.
                </li>
                <li>
                  Saúde: Formação de pelo menos 1 agente de saúde por
                  comunidade; Oferecimento de cursos sobre higiene, saúde e
                  planejamento familiar para pelo menos 20 famílias
                </li>
                <li>
                  Geração de renda: Instalação de um centro de beneficiamento de
                  açaí e castanha;
                </li>
                <li>
                  Educação: Implementação e manutenção de um centro educacional
                  para jovens e adultos; facilitação de acesso a cursos à
                  distância para os moradores das 3 comunidades presentes na
                  Resex.
                </li>
                <li>
                  Infraestrutura: melhoria das condições sanitárias das
                  residências das famílias residentes na Resex; implementação
                  futura de 3 novas comunidades, assentando aproximadamente 12
                  famílias.
                </li>
                <li>
                  Fortalecimento de jovens e mulheres: promoção de oficinas
                  sobre empoderamento e liderança com foco nas público mais
                  vulnerável da Resex.
                </li>
                <li>
                  Meio ambiente: Oficinas e treinamentos trimestrais para os
                  moradores interessados sobre os seguintes temas: agroecologia,
                  destinação de resíduos e compostagem
                </li>
              </ul>
              <p className="my-3 indent-4">
                Para a Biodiversidade: proteção de habitats e de espécies com
                algum grau de ameaça e/ou endêmicas. O manejo dos recursos
                madeireiros e não madeireiros favorece a continuidade da
                floresta e promove a sustentabilidade da área. A área é
                categorizada como de prioridade “Muito alta” para conservação
                por conter diversas espécies em algum grau de ameaça (segundo a
                IUCN) e estar localizada no Centro de Endemismo Rondônia,
                considerado uma das mais importantes áreas de endemismo de aves
                na América do Sul
              </p>
            </td>
          </tr>
          <tr>
            <th>Status</th>
            <td>Em andamento</td>
          </tr>
        </table>
      </Header.Body>
    </FormContainer>
  );
}
