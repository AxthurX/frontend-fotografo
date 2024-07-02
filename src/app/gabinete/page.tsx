/* eslint-disable quotes */
import CardDirectorBoard from "@/components/CardDirectorBoard";
import FormContainer from "@/components/FormStructure/FormContainer";
import { Header } from "@/components/FormStructure/Header";
import GabineteTabs from "@/components/GabineteTabs";
import secretarios, { diretoriaExecutiva } from "@/lib/gabinete";
import GabRecentNews from "./components/GabRecentNews";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackGab from "./error";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const GabinetePage = () => {
  return (
    <div
      style={{
        backgroundImage:
          'url("/ext-files/website-icons/PortalSEDAM/Painel-gabinete1.png")',
        backgroundSize: "60%",
        backgroundPosition: "center",
      }}
    >
      <FormContainer>
        <div>
          <Header className="h-full">
            <Header.Title className="my-0 mt-0 flex h-40  w-full items-center justify-center bg-calpolygreen-900 text-center text-beige-50 ">
              Secretários
            </Header.Title>
            <Header.Body className="-mb-1 flex w-full flex-wrap  justify-center py-16">
              {secretarios.map((diretor) => (
                <div
                  className="mx-auto flex w-full items-center justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  key={diretor.title}
                >
                  <CardDirectorBoard
                    name={diretor.title}
                    role={diretor.description}
                    imageUrl={diretor.url}
                    imageAlt={diretor.alt}
                    pageUrl={diretor.link}
                  />
                </div>
              ))}
            </Header.Body>
            <Header.Title className="my-0 mt-0 flex h-40  w-full items-center justify-center bg-calpolygreen-900 text-center text-beige-50 ">
              Diretoria Executiva
            </Header.Title>
            <Header.Body className="-mb-1 flex w-full flex-wrap  justify-center py-16">
              {diretoriaExecutiva.map((diretor) => (
                <div
                  className="mx-auto flex w-full items-center justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  key={diretor.title}
                >
                  <CardDirectorBoard
                    name={diretor.title}
                    role={diretor.description}
                    imageUrl={diretor.url}
                    imageAlt={diretor.alt}
                    pageUrl={diretor.link}
                  />
                </div>
              ))}
            </Header.Body>
          </Header>
        </div>

        <GabineteTabs />

        <div className="mt-20 min-h-32 w-full">
          <div className="h-24 w-full border border-sage-600 bg-calpolygreen-900 text-center text-beige-50">
            <h3 className="mx-auto flex h-full  w-full items-center justify-center text-center align-middle text-2xl">
              Notícias recentes
            </h3>
          </div>
        </div>

        <ErrorBoundary FallbackComponent={ErrorFallbackGab}>
          <Suspense>
            <GabRecentNews />
          </Suspense>
        </ErrorBoundary>
      </FormContainer>
    </div>
  );
};

export default GabinetePage;
