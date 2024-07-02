import CarouselV4 from "@/components/CarouselV4";
import CarouselError from "@/components/CarouselV4/CarouselError";
import CarouselSkeleton from "@/components/CarouselV4/CarouselSkeleton";
import HomeImportantLinks from "@/components/HomeImportantLinks";
import HomeTabs from "@/components/HomeTabs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Card from "../ouvidoria/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div id="carousel">
        <ErrorBoundary FallbackComponent={CarouselError}>
          <Suspense fallback={<CarouselSkeleton />}>
            <CarouselV4 limit={10} />
            {/* O limite foi aumentado para 10 a pedido da ASCOM devido a cobrança para aparecer o post da "pedra queimada" */}
          </Suspense>
        </ErrorBoundary>
      </div>
      <HomeTabs />
      <div className="mb-16 h-20 bg-calpolygreen-900 text-beige-50">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Ouvidoria
        </h3>
      </div>

      <div className="mx-auto mb-14 mt-10 grid w-full grid-cols-1 justify-center gap-5 text-center md:grid md:grid-cols-3">
        <div className="mx-auto">
          <Link href="/ouvidoria" target="_blank" prefetch={false}>
            <Card
              title="Telefone"
              url="/ext-files/website-icons/telefone.png"
              highlight="0800 666 1150"
              description="(69) 3212-9648 (07h30 às 13h30)"
            />
          </Link>
        </div>
        <div className="mx-auto">
          <Link href="/ouvidoria" target="_blank" prefetch={false}>
            <Card
              title="Email"
              url="/ext-files/website-icons/email.png"
              highlight="ouvidoria@sedam.ro.gov.br"
            />
          </Link>
        </div>
        <div className="mx-auto">
          <Link
            href="https://falabr.cgu.gov.br/web/home"
            target="_blank"
            prefetch={false}
          >
            <Card
              title="Fala.BR"
              url={"/ext-files/website-icons/Logo-falabr-azul-whitebg.png"}
              description="Acesso à informação, denúncias, elogios, reclamações, solicitações, sugestões."
            />
          </Link>
        </div>
      </div>

      <div className="mb-16 h-20 bg-calpolygreen-900 text-beige-50">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Links importantes
        </h3>
      </div>
      <HomeImportantLinks />
    </>
  );
}
