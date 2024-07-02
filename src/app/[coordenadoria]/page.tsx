import BackButton from "@/components/BackButton";
import CardForPageCoordenadorias from "@/components/CardForPageCoordenadorias";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import HomeRecentNews from "@/components/HomeRecentNews";
import HomeRecentNewsLoading from "@/components/HomeRecentNews/HomeRecentNewsLoading";
import PostBody from "@/components/PostBody";
import Loading from "@/components/PostBody/PostBodyLoading";
import { coordenadorias } from "@/lib/coordenadorias";
import diretores from "@/lib/quem/diretores";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error";
import Services from "./components/services";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = false;
export function generateStaticParams() {
  const params = [];
  for (const coordenadoria of coordenadorias) {
    params.push({ coordenadoria: coordenadoria.slug });
  }
  return params;
}
type CoordenadoriaSlug = (typeof coordenadorias)[number]["slug"];

const CoordenadoriaPage = async ({
  params,
}: {
  params: { coordenadoria: CoordenadoriaSlug };
}) => {
  const sector_data = coordenadorias.find(
    (coordenadoria) => coordenadoria.slug === params.coordenadoria,
  );
  const coordinator_data = diretores.find(
    (diretores) => diretores.sectorAcronym === params.coordenadoria,
  );
  const generatedParams = generateStaticParams();
  if (!generatedParams.some(param => param.coordenadoria === params.coordenadoria)) {
    return notFound();
  }

  return (
    <FormContainer>
      <Header className="relative">
        <BackButton />
        <Header.Title className="my-0 flex min-h-40 w-full items-center justify-center bg-calpolygreen-900 py-7 text-beige-50">
          {sector_data?.description}
        </Header.Title>
        <Header.Body className="my-12">
          {sector_data && coordinator_data && coordinator_data.role && (
            <CardForPageCoordenadorias
              imageUrl={coordinator_data.imageUrl}
              imageAlt={`Foto de ${coordinator_data.name}`}
              title={sector_data.coordinator}
              description={coordinator_data.role}
              key={coordinator_data.name}
              contact_email={sector_data.contact_email}
              contact_phone={sector_data.contact_phone}
              contact_whatsapp={sector_data.contact_whatsapp}
            />
          )}
        </Header.Body>
      </Header>
      <div>
        <Services coordenadoria={params.coordenadoria} />
      </div>
      {params.coordenadoria == "codef" && (
        <PostBody
          params={{ post_id: `${params.coordenadoria}-atribuicoes` }}
          title="Atribuições"
        />
      )}
      <Suspense fallback={<Loading />}>
        {(params.coordenadoria != "codef" && params.coordenadoria != "cti") && (
          <PostBody
            params={{ post_id: `${params.coordenadoria}-midia` }}
            title="Mídia"
          />
        )}
        <PostBody
          params={{ post_id: `${params.coordenadoria}-downloads` }}
          title="Downloads"
        />
        {params.coordenadoria == "coreh" && (
          <PostBody
            params={{ post_id: "coreh-o-conselho" }}
            title="Conselho"
          />
        )}
      </Suspense>
      <div className="h-24 w-full border border-sage-600 bg-calpolygreen-900 text-center text-beige-50">
        <h3 className="mx-auto flex h-full w-full items-center justify-center text-center align-middle text-3xl font-semibold">
          Notícias
        </h3>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full">
          <div className="mx-auto my-12 grid max-w-screen-xl grid-cols-1 justify-items-center gap-x-2 gap-y-12 px-10 text-center sm:gap-x-4 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            <Suspense fallback={<HomeRecentNewsLoading />}>
              <HomeRecentNews tag={params.coordenadoria} />
            </Suspense>
          </div>
          <div className="mb-16 flex w-full justify-end px-10 xl:px-24">
            <Link
              href={`/noticias?tags=${params.coordenadoria}`}
              className="btn btn-secondary text-xl text-beige-50"
            >
              Ver mais
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    </FormContainer>
  );
};

export default CoordenadoriaPage;
