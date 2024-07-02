import HomeRecentNews from "@/components/HomeRecentNews";
import HomeRecentNewsLoading from "@/components/HomeRecentNews/HomeRecentNewsLoading";

import Link from "next/link";
import { Suspense } from "react";


export const dynamic = "force-dynamic";

export default function News() {
  return (
    <>
      <div className="mx-auto mb-12 grid max-w-screen-xl grid-cols-1 justify-items-center gap-x-2 gap-y-12 px-10 text-center sm:gap-x-4 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">

        
          <Suspense fallback={<HomeRecentNewsLoading />}>
            <HomeRecentNews />
          </Suspense>
        
      </div>
      <div className="mb-16 flex w-full justify-end px-10 xl:px-24">
        <Link
          href="/noticias"
          className="btn btn-secondary text-xl text-beige-50"
        >
          Ver mais
        </Link>
      </div>
    </>
  );
}
