/* eslint-disable quotes */
import CardDirectorBoard from "@/components/CardDirectorBoard";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import diretores from "@/lib/quem/diretores";

export default function QuemEQuem() {
  return (
    <div
      style={{
        backgroundImage:
          'url("/ext-files/website-icons/PortalSEDAM/Painel-gabinete1.png")',
        backgroundSize: "50%",
        backgroundPosition: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <FormContainer>
        <Header className="min-h-[auto]">
          <Header.Title>Quem é quem</Header.Title>
        </Header>
        <Separator className="h-12 bg-sage-200" />
        <div className="grid grid-cols-1 justify-items-center gap-4 pb-5 text-center contrast-less:container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {diretores.map((diretor) => (
            <CardDirectorBoard
              imageUrl={diretor.imageUrl}
              imageAlt={"foto de " + diretor.name}
              name={diretor.name}
              role={diretor.sector}
              key={diretor.name}
              pageUrl={diretor.pageUrl}
            />
          ))}
        </div>
      </FormContainer>
    </div>
  );
}
