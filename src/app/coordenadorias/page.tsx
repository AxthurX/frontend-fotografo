"use client";

import CombinedCard from "@/components/CardCoord";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Link from "next/link";

interface IButton {
  title: string;
  href: string;
  description: string;
  image: string;
}

const buttonsData = [
  {
    title: "CCI",
    href: "/cci",
    description: "Controle Interno",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCCI.png",
  },
  {
    title: "COAI",
    href: "/coai",
    description: "Auto de Infração",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOAI.png",
  },
  {
    title: "CODEA",
    href: "/codea",
    description: "Descentralização Ambiental",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCODEA.png",
  },
  {
    title: "CODEF",
    href: "/codef",
    description: "Desenvolvimento Florestal",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCODEF.png",
  },
  {
    title: "DGOVCLIMA",
    href: "/dgovclima",
    description: "Diretoria de Governança Climática",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconDGOVCLIMA.png",
  },
  {
    title: "CEAM",
    href: "/ceam",
    description: "Educação Ambiental",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCEAM.png",
  },
  {
    title: "CFP",
    href: "/cfp",
    description: "Floresta Plantada",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCFP.png",
  },
  {
    title: "COGEO",
    href: "/cogeo",
    description: "Geociências",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOGEO.png",
  },
  {
    title: "CGRH",
    href: "/cgrh",
    description: "Gestão e Recursos Humanos",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCGRH.png",
  },
  {
    title: "COLMAM",
    href: "/colmam",
    description: "Licenciamento e Monitoramento Ambiental",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOLMAM.png",
  },
  {
    title: "COPAF",
    href: "/copaf",
    description: "Patrimônio, Administração e Finanças",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOPAF.png",
  },
  {
    title: "CPO",
    href: "/cpo",
    description: "Planejamento e Orçamento",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCPO.png",
  },
  {
    title: "COPIN",
    href: "/copin",
    description: "Povos Indígenas",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOPIN.png",
  },
  {
    title: "COPAM",
    href: "/copam",
    description: "Proteção Ambiental",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOPAM.png",
  },
  {
    title: "COREH",
    href: "/coreh",
    description: "Recursos Hídricos",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOREH.png",
  },
  {
    title: "COMRAR",
    href: "/comrar",
    description: "Regularização Ambiental Rural",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCOMRAR.png",
  },
  {
    title: "CTI",
    href: "/cti",
    description: "Tecnologia da Informação",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCTI.png",
  },
  {
    title: "CUC",
    href: "/cuc",
    description: "Unidades de Conservação",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconCUC.png",
  },
  {
    title: "ASCOM",
    href: "/ascom",
    description: "Assessoria de Comunicação",
    image:
      "/ext-files/website-icons/coordenadorias/icones_das_coordenadorias/iconASCOM.png",
  },
];

buttonsData.sort((a, b) => a.title.localeCompare(b.title));

const CardComponent = ({ button }: { button: IButton }) => {
  return (
    <div className="mt-2 duration-500 animate-in fade-in">
      <Link href={button.href}>
        <CombinedCard
          classNameIcon="h-32 w-auto mt-4"
          title={button.title}
          image={button.image}
          description={button.description}
        />
      </Link>
    </div>
  );
};

export default function Coordenadorias() {
  return (
    <>
      <FormContainer className="grow pb-8">
        <Header className="min-h-[auto]">
          <Header.Title>Coordenadorias</Header.Title>
        </Header>
        <Separator id="separador" className="mb-0 h-12 bg-sage-200" />
        <div className="container my-4 grid grid-cols-1 justify-items-center gap-y-4 text-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {buttonsData.map((button, index) => (
            <CardComponent key={index} button={button} />
          ))}
        </div>
      </FormContainer>
    </>
  );
}
