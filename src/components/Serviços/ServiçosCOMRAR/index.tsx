import Link from "next/link";
import Card from "../../Card";

const ServicosCODEF = () => {
  return (
    <div className="mt-4 grid grid-cols-12 w-3/4 mx-auto ">
      <Link href="http://car.sedam.ro.gov.br" target="_blank" prefetch={false} className="col-span-full justify-center mx-auto">
        <Card
          imageClassName="p-2.5"
          title="CAR"
          description="Cadastro Ambiental Rural"
          url={"/ext-files/website-icons/sicar2.png"}
        />
      </Link>
    </div>
  );
};

export default ServicosCODEF;
