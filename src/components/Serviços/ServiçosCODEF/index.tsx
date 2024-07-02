import Link from "next/link";
import Card from "../../Card";

const ServicosCODEF = () => {
  return (
    <div className="mt-4 grid grid-cols-12 w-10/12 mx-auto ">
      <Link
        href="https://sistemas.sedam.ro.gov.br/ceprof/index.aspx"
        target="_blank"
        prefetch={false}
        className="col-span-4 max-md:col-span-full justify-center mx-auto"
      >
        <Card
          title="CEPROF"
          description="Cadastro de Exploradores e Consumidores de Produtos Florestais"
          url={"/ext-files/website-icons/Logo-ceprof-whitebg.png"}
        />
      </Link>
      <Link
        href="https://servicos.ibama.gov.br/ctf/sistema.php"
        target="_blank"
        prefetch={false}
        className="col-span-4 max-md:col-span-full justify-center mx-auto"
      >
        <Card
          title="Sinaflor - Cidadão"
          url="/ext-files/website-icons/Sinaflor.png"
          description="Sistema Nacional de Controle da Origem dos Produtos Florestais"
        />
      </Link>
      <Link
        href="https://sei.sistemas.ro.gov.br/sei/controlador_externo.php?acao=usuario_externo_logar&id_orgao_acesso_externo=0"
        target="_blank"
        prefetch={false}
        className="col-span-4 max-md:col-span-full justify-center mx-auto"
      >
        <Card
          imageClassName=""
          title="SEI"
          url="/ext-files/website-icons/sei-externo.jpeg"
          description="Acesso Externo ao SEI"
        />
      </Link>
    </div>
  );
};

export default ServicosCODEF;
