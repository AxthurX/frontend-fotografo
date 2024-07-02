import Link from "next/link";
import Card from "../../Card";

const ServicosCFP = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-3">
      <Link href="/auf">
        <Card
          title="AUF"
          url="/ext-files/website-icons/fogo.jpg"
          description="Autorização de Uso de Fogo"
        />
      </Link>
      <Link href="/deaf">
        <Card
          title="DEAF"
          url="/ext-files/website-icons/iconDaef.jpg"
          description="Declaração de Exploração Anual Florestal"
        />
      </Link>
      <Link href="/lpca">
        <Card
          title="LPCA"
          url="/ext-files/website-icons/limpeza-pastagem.jpg"
          description="Limpeza de Pastagem e Cultura Agrícola"
        />
      </Link>
    </div>
  );
};

export default ServicosCFP;
