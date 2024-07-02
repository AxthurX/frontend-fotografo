import { Header } from "@/components/FormStructure/Header";
import Separator from "@/components/FormStructure/Separator";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container  border border-t-0 border-sage-300 bg-beige-100  max-sm:border-0 md:p-0">
      <Header>

        <Header.Title className="text-center">
          Sobre PGSA
        </Header.Title>
        <Separator className="mb-10 h-12 bg-sage-200" />
        <div className="mb-16 mx-auto w-full h-20 border border-sage-600 bg-calpolygreen-900 text-beige-50">
          <h3 className="flex h-full mx-auto  w-full items-center justify-center text-center align-middle text-2xl">
            Estratégia de adaptação e mitigação
          </h3>
        </div>


        <div className="px-4 md:px-8 lg:px-12 xl:px-40">
          <p className="text-justify">
            Visando garantir a redução das emissões de gases do efeito estufa e a
            mitigação adaptação dos efeitos das mudanças climáticas, por meio de
            ações e esforços da população, dos múltiplos usuários dos recursos
            naturais e do Pode Público, assegurando a produção de alimentos, a
            manutenção da biodiversidade, os direitos dos povos indígenas e dos
            povos e comunidades tradicionais promovendo o desenvolvimento
            econômico sustentável.
          </p>
          <div className="mx-auto  mb-10 flex justify-center rounded-lg">
            <Image
              src="/ext-files/website-icons/EstrategiaDeMitigacaoAdaptacaoPGSA.svg"
              alt="organograma da estratégia de adaptação e mitigação"
              width={800}
              height={490}
              className="my-10"
            />
          </div>
        </div>
        <div className="mb-16 mx-auto w-full h-20 border border-sage-600 bg-calpolygreen-900 text-beige-50">
          <h3 className="flex h-full mx-auto  w-full items-center justify-center text-center align-middle text-2xl">
            Estrutura de implementação
          </h3>
        </div>
        <div className="px-4 md:px-8 lg:px-12 xl:px-40">
          <Link href="#">
            Lei n° 4.437 de 17 de dezembro de 2018, fica instituída a Política
            Estadual de Governança Climática e Serviços Ambientais – PGSA, e
            criado o Sistema Estadual de Governança Climática e Serviços
            Ambientais – SGSA, no âmbito do Estado de Rondônia.
          </Link>
        </div>
        <div className="mb-10  px-4 md:px-8 lg:px-12 xl:px-40">
          <Image
            className="mt-5"
            src="/ext-files/website-icons/EstruturaDeImplementacaoPGSA.svg"
            alt="Organograma do sistema estadual de governança climática e serviços ambientais"
            width={1280}
            height={720}
          />
        </div>
        <div className="mb-16 h-26 w-full md:h-20 border border-sage-600 bg-calpolygreen-900 text-beige-50">
          <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
            Instrumentos da política estadual de governança climática e serviços
            ambientais
          </h3>
        </div>
        <Header.Body className="md:justify-center   lg:justify-center lg:px-12 xl:justify-center xl:px-40">
          <p>
            Com a finalidade de promover o entendimento adequado para tomada de
            decisões, promoção de ações e minimização de riscos, principalmente no
            que diz respeito à mitigação dos impactos, adaptação e análise de
            vulnerabilidade.
          </p>
          <div>
            <Image
              src="/ext-files/website-icons/INSTRUMENTOS-DA-POLITICA-ESTADUAL-DE-GOVERNANCA-CLIMATICA-E-SERVICOS-AMBIENTAIS.svg"
              width={800}
              height={670}
              alt="organograma dos instrumentos da política estadual de governança climática e serviços ambientais"
              className="mx-auto"
            />
          </div>
        </Header.Body>
      </Header>
    </div>
  );
}
