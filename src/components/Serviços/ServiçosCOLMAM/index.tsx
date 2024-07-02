import Link from "next/link";
import Card from "../../Card";

const ServicosCOLMAM = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/ati">
        <Card
          title="ATI"
          url="/ext-files/website-icons/caminhoes.jpg"
          description="Autorização de Transporte Intermunicipal"
        />
      </Link>
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
    </div>
  );
};

export default ServicosCOLMAM;
