import Fieldset from "@/components/FormStructure/Fieldset";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Image from "next/image";
import Link from "next/link";

interface ICards {
  label: string;
  src: string;
}

export default function lgpdPage() {
  const cards: ICards[] = [
    {
      label: "Grupo de Trabalho e encarregados lgpd pelo sistema",
      src: "/ext-files/website-icons/lgpd/GrupoDeTrabalho.svg",
    },
    {
      label: "POLÍTICA DE PROTEÇÃO DE DADOS E DE SEGURANÇA DA INFORMAÇÃO",
      src: "/ext-files/website-icons/lgpd/PoliticaDeProtecao.svg",
    },
    {
      label: "INVENTÁRIO DE DADOS PESSOAIS",
      src: "/ext-files/website-icons/lgpd/InvetarioDeDados.svg",
    },
    {
      label: "ADEQUAÇÃO DE CONTRATOS",
      src: "/ext-files/website-icons/lgpd/AdequacaoDeContratos.svg",
    },
    {
      label: "MONITORAMENTO DAS ATIVIDADES DO PROJETO",
      src: "/ext-files/website-icons/lgpd/MonitoramentoDasAtividades.svg",
    },
    {
      label: "COMUNICAÇÃO, CAPACITAÇÕES  E MATERIAIS DISPONÍVEIS",
      src: "/ext-files/website-icons/lgpd/Comunicacao.svg",
    },
    {
      label: "RELATÓRIO DE IMPACTO DE PROTEÇÃO DE DADOS - RIPD",
      src: "/ext-files/website-icons/lgpd/RelatorioDeImpacto.svg",
    },
    {
      label: "MEDIDAS DE CONFORMIDADE E PLANO DE RESPOSTA",
      src: "/ext-files/website-icons/lgpd/MedidasDeConformidade.svg",
    },
  ];

  return (
    <FormContainer className="flex-grow">
      <Header>
        <Header.Title>LGPD - Lei Geral de Proteção de Dados</Header.Title>
        <Header.Body>
          A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei n° 13.709/2018,
          foi promulgada para proteger os direitos fundamentais de liberdade e
          de privacidade, e a livre formação da personalidade de cada indivíduo.
          A Lei fala sobre o tratamento de dados pessoais, dispostos em meio
          físico ou digital, feito por pessoa física ou jurídica de direito
          público ou privado, englobando um amplo conjunto de operações que
          podem ocorrer em meios manuais ou digitais.
          <br />
          <div className="mt-3">
            <div className="flex gap-1 text-xs ">
              <span className="text-xs font-bold">Fonte:</span>

              <Link
                prefetch={false}
                className="link-hover link underline"
                href={
                  "https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"
                }
                target="_blank"
              >
                gov.br
              </Link>
            </div>
          </div>
        </Header.Body>
      </Header>
      <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
      <Fieldset className="mx-auto flex justify-center">
        <div className="mb-12 grid grid-cols-12">
          <div className="col-span-full my-5 flex flex-col gap-y-2 text-center ">
            <p className="text-3xl font-bold max-md:text-2xl max-sm:text-2xl">
              PROJETO DE ADEQUAÇÃO À LEI GERAL DE PROTEÇÃO DE DADOS - LGPD
            </p>
            <p className="text-3xl font-bold max-md:text-2xl max-sm:text-2xl">
              PAINEL DE MONITORAMENTO SISTEMA
            </p>
            <p className="mb-4 mt-2 text-lg font-semibold">
              Lei 13.709/2018 - Lei Geral de Proteção de Dados - LGPD
            </p>
          </div>
          {cards.map((cards: ICards) => (
            <div
              key={cards.label}
              className="col-span-4 mx-auto my-2 flex flex-col text-center font-semibold max-md:col-span-6 max-sm:col-span-full"
            >
              <p className="m-4 min-h-10 text-lg uppercase">{cards.label}</p>
              <div className="flex items-center justify-center">
                <Image
                  className="flex items-center"
                  src={encodeURI(cards.src)}
                  alt={cards.label}
                  width={120}
                  height={120}
                />
              </div>
            </div>
          ))}
        </div>
      </Fieldset>
    </FormContainer>
  );
}
