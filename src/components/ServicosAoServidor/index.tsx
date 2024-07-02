import Card from "@/components/Card";
import Link from "next/link";

export default function ServicosAoServidor() {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-y-12 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Link
        href="http://protocolo.intranet.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card
        imageClassName=""
          title="Sistema de Protocolo"
          url="/ext-files/website-icons/testprotocolo.png"
          description="ProtocoloWeb"
        />
      </Link>
      <Link
        href="https://sei.sistemas.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card
          imageClassName="p-4 bg-[#0494c7]"
          title="SEI"
          url="/ext-files/website-icons/sei.png"
          description="Sistema Eletrônico de Informações"
        />
      </Link>
      <Link
        href="http://siglam.sedam.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card
        imageClassName="px-16"
          title="SIGLAM"
          url="/ext-files/website-icons/Siglam.jpg"
          // description="Requer Microsoft Silverlight. Utilize o um navegador compatível."
        />
      </Link>
      <Link
        href="https://webmail.sedam.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card
        imageClassName="p-4"
          title="Webmail"
          url="/ext-files/website-icons/zimbra.png"
          description="Zimbra"
        />
      </Link>
      <Link
        href="https://contracheque.sistemas.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card title="Contracheque" url="/ext-files/website-icons/contracheque.png" />
      </Link>
      <Link
        href="https://atendimento.setic.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card imageClassName="p-4" title="Atendimento técnico" url="/ext-files/website-icons/glpi.png" />
      </Link>
      <Link
        href="https://sinaflor-int.ibama.gov.br/sinaflor-int/SigefInterno.html"
        target="_blank"
        prefetch={false}
      >
        <Card
          title="Sinaflor - Intranet"
          url="/ext-files/website-icons/Sinaflor.png"
          description="Sistema Nacional de Controle da Origem dos Produtos Florestais"
        />
      </Link>
      <Link
        href="https://portaldoservidor.sistemas.ro.gov.br/"
        target="_blank"
        prefetch={false}
      >
        <Card
        imageClassName="bg-blue-700"
          title="Portal do Servidor"
          url="/ext-files/website-icons/portaldoservidor1.png"
          description=""
        />
      </Link>
    </div>
  );
}
