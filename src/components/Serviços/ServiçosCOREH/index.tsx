import Link from "next/link";
import Card from "../../Card";

const ServicosCOREH = () => {
  return (
    <div className="mt-4 grid  grid-cols-1 gap-10">
      <Link href="/duirh">
        <Card
          title="DUIRH"
          url="/ext-files/website-icons/ourtoga.jpg"
          description="Declaração de Uso Insignificante de Recursos Hidricos"
        />
      </Link>
    </div>
  );
};

export default ServicosCOREH;
