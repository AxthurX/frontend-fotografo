import dynamic from "next/dynamic";
import { ReactNode } from "react";

const ServicosCFP = dynamic(() => import("@/components/Serviços/ServiçosCFP"));
const ServicosCOMRAR = dynamic(() => import("@/components/Serviços/ServiçosCOMRAR"));
const ServicosCODEF = dynamic(() => import("@/components/Serviços/ServiçosCODEF"));
const ServicosCOREH = dynamic(
  () => import("@/components/Serviços/ServiçosCOREH"),
);
const ServicosCOPAM = dynamic(
  () => import("@/components/Serviços/ServiçosCOPAM"),
);
const ServicosCOGEO = dynamic(
  () => import("@/components/Serviços/ServiçosCOGEO"),
);
const ServicosCOLMAM = dynamic(
  () => import("@/components/Serviços/ServiçosCOLMAM"),
);

function Wrapper({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="h-24 w-full border border-sage-600 bg-calpolygreen-900 text-center text-beige-50">
        <h3 className="mx-auto flex h-full  w-full items-center justify-center text-center align-middle text-3xl font-semibold">
          Serviços
        </h3>
      </div>
      <div className="my-10 flex min-h-64 w-full justify-center px-2">
        {children}
      </div>
    </>
  );
}

export default function Services({ coordenadoria }: { coordenadoria: string }) {
  switch (coordenadoria) {
    case "cfp":
      return (
        <Wrapper>
          <ServicosCFP />
        </Wrapper>
      );
    case "codef":
      return (
        <Wrapper>
          <ServicosCODEF />
        </Wrapper>
      );
    case "comrar":
      return (
        <Wrapper>
          <ServicosCOMRAR />
        </Wrapper>
      );
    case "colmam":
      return (
        <Wrapper>
          <ServicosCOLMAM />
        </Wrapper>
      );
    case "cogeo":
      return (
        <Wrapper>
          <ServicosCOGEO />
        </Wrapper>
      );
    case "copam":
      return (
        <Wrapper>
          <ServicosCOPAM />
        </Wrapper>
      );
    case "coreh":
      return (
        <Wrapper>
          <ServicosCOREH />
        </Wrapper>
      );
    default:
      return null;
  }
}
