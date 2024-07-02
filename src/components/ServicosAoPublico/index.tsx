import Card from "@/components/Card";
import Link from "next/link";

export default function ServicosAoPublico() {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-y-12 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Link href="/area-usuario">
        <Card
          title="Área do usuário"
          url="/ext-files/website-icons/stefan-stefancik-5p_7M5MP2Iw-unsplash.jpg"
          description="Acompanhe suas solicitações de formulários online aqui"
        />
      </Link>

      <Link href="/ati">
        <Card
          title="ATI"
          url="/ext-files/website-icons/caminhoes.jpg"
          description="Autorização de Transporte Intermunicipal"
        />
      </Link>
      <Link href="/auf">
        <Card
          title="AUF"
          url="/ext-files/website-icons/fogo.jpg"
          description="Autorização de Uso de Fogo"
        />
      </Link>
      {/* <Link href="/asf">
        <Card
          title="ASF"
          url="/ext-files/website-icons/asfalto.jpg"
          description="Dispensa de Licenciamento Ambiental para a Atividade de Pavimentação Asfáltica"
        />
      </Link> */}
      <Link href="/casc">
        <Card
          title="CASC"
          url="/ext-files/website-icons/cascalho.jpg"
          description="Dispensa de Licenciamento Ambiental para Extração de Cascalho"
        />
      </Link>
      <Link href="/cila">
        <Card
          title="CILA"
          url="/ext-files/website-icons/licenciamento-ambiental.jpg"
          description="Certidão de Inexigibilidade de Licenciamento Ambiental"
        />
      </Link>
      <Link href="/ditl">
        <Card
          title="DITL"
          url="/ext-files/website-icons/ditl.jpg"
          description="Declaração de Isenção de Taxas de Licenciamento Ambiental"
        />
      </Link>
      <Link href="/dla">
        <Card
          title="DLA"
          url="/ext-files/website-icons/licenciamento.jpg"
          description="Dispensa de Licenciamento Ambiental"
        />
      </Link>
      {/* <Link href="/deaf">
        <Card
          title="DEAF"
          url="/ext-files/website-icons/iconDaef.jpg"
          description="Declaração de Exploração Anual Florestal"
        />
      </Link> */}
      <Link href="/duirh">
        <Card
          title="DUIRH"
          url="/ext-files/website-icons/ourtoga.jpg"
          description="Declaração de Uso Insignificante de Recursos Hidricos"
        />
      </Link>
      <Link href="/dof">
        <Card
          title="DOF"
          url="/ext-files/website-icons/origem-florestal.jpg"
          description="Documento de Origem Florestal"
        />
      </Link>
      <Link href="/lpca">
        <Card
          title="LPCA"
          url="/ext-files/website-icons/limpeza-pastagem.jpg"
          description="Limpeza de Pastagem e Cultura Agrícola"
        />
      </Link>
      {/* <Link href="/pisc">
        <Card
          title="PISC"
          url="/ext-files/website-icons/pisicultura.png"
          description="Licenciamento Ambiental Simplificado de Piscicultura"
        />
      </Link> */}
      <Link
        href="https://solar.sistemas.ro.gov.br"
        target="_blank"
        prefetch={false}
      >
        <Card
          title="SOLAR"
          url={"/ext-files/website-icons/solar_svg.svg"}
          imageClassName="object-fill p-4"
          description="Sistema de Outorga e Licenciamento Ambiental de Rondônia"
        />
      </Link>
      <Link href="http://car.sedam.ro.gov.br" target="_blank" prefetch={false}>
        <Card
          imageClassName="p-2.5"
          title="CAR"
          description="Cadastro Ambiental Rural"
          url={"/ext-files/website-icons/sicar2.png"}
        />
      </Link>
      <Link
        href="https://sistemas.sedam.ro.gov.br/ceprof/index.aspx"
        target="_blank"
        prefetch={false}
      >
        <Card
          title="CEPROF"
          description="Cadastro de Exploradores e Consumidores de Produtos Florestais"
          url={"/ext-files/website-icons/Logo-ceprof-whitebg.png"}
        />
      </Link>
      <Link
        href="https://dare.sefin.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card
          title="DARE"
          description="Documento de Arrecadação de Receitas Estaduais"
          url={"/ext-files/website-icons/logo-sefin.svg"}
          imageClassName="px-8 py-4"
        />
      </Link>
      <Link
        href="https://transparencia.sedam.ro.gov.br/pesquisar-processo/"
        target="_blank"
        prefetch={false}
      >
        <Card
          imageClassName="px-16"
          title="SIGLAM"
          description="Acompanhamento de processos"
          url="/ext-files/website-icons/Siglam.jpg"
        />
      </Link>
      <Link
        href="https://servicos.ibama.gov.br/ctf/sistema.php"
        target="_blank"
        prefetch={false}
      >
        <Card
          title="Sinaflor - Cidadão"
          url="/ext-files/website-icons/Sinaflor.png"
          description="Sistema Nacional de Controle da Origem dos Produtos Florestais"
        />
      </Link>
    </div>
  );
}