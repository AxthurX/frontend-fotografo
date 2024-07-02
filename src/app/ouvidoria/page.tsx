import Fieldset from "@/components/FormStructure/Fieldset";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Link from "next/link";
import Card from "./components/Card";

const Ouvidoria = () => {
  return (
    <>
      <FormContainer>
        <Header>
          <Header.Title>Ouvidoria Ambiental</Header.Title>
          <Header.Body className="text-pretty text-justify max-sm:p-2">
            Criada para ouvir o cidadão, qualquer pessoa pode se comunicar livre
            e diretamente com a Secretaria de Estado do Desenvolvimento
            Ambiental, seja trazendo sugestões ou fazendo denúncias, reclamações
            e/ou elogios sobre os serviços prestados pelos orgãos públicos. A
            Ouvidoria atende tanto servidores como a população. Manifestando sua
            opinião, o cidadão pode fazer valer sua voz e contribuir para
            aprimorar o serviço público, compartilhando, assim, da administração
            estadual.
            <br />
            <br />
            <Link
              className="link text-blue-700"
              href="/ext-files/files/Cartilha-Ouvidoria-compressed.pdf"
              prefetch={false}
              target="_blank"
            >
              Cartilha da Ouvidoria Ambiental
            </Link>
            <br />
            <Link
              className="link text-blue-700"
              href="/ext-files/files/Cartilha_do_Cidadao.Ouvidoria_Geral_do_Estado._pdf-1.pdf"
              prefetch={false}
              target="_blank"
            >
              Cartilha do Cidadão
            </Link>
          </Header.Body>
        </Header>
        <Separator className="h-12 bg-sage-200" />
        <Fieldset>
          <div className="mx-auto mb-14 mt-10 grid w-full grid-cols-1 justify-center gap-5 text-center md:grid md:grid-cols-3">
            <div className="mx-auto">
              <Link href="/ouvidoria" target="_blank" prefetch={false}>
                <Card
                  title="Telefone"
                  url="/ext-files/website-icons/telefone.png"
                  highlight="0800 666 1150"
                  description="(69) 3212-9648 (07h30 às 13h30)"
                />
              </Link>
            </div>
            <div className="mx-auto">
              <Link href="/ouvidoria" target="_blank" prefetch={false}>
                <Card
                  title="Email"
                  url="/ext-files/website-icons/email.png"
                  highlight="ouvidoria@sedam.ro.gov.br"
                />
              </Link>
            </div>
            <div className="mx-auto">
              <Link
                href="https://falabr.cgu.gov.br/web/home"
                target="_blank"
                prefetch={false}
              >
                <Card
                  title="Fala.BR"
                  url={"/ext-files/website-icons/Logo-falabr-azul-whitebg.png"}
                  description="Acesso à informação, denúncias, elogios, reclamações, solicitações, sugestões."
                />
              </Link>
            </div>
          </div>                                                           
        </Fieldset>
      </FormContainer>
    </>
  );
};

export default Ouvidoria;
