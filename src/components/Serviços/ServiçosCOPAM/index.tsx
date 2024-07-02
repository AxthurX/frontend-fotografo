import Link from "next/link";
import Card from "../../Card";

const ServicosCOPAM = () => {
  return (
    <div className="mt-4 grid  grid-cols-1 gap-10">
      <Link href="/dof">
        <Card
          title="DOF"
          url="/ext-files/website-icons/origem-florestal.jpg"
          description="Documento de Origem Florestal"
        />
      </Link>
    </div>
  );
};

export default ServicosCOPAM;
