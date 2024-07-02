import { getRecentPosts } from "@/components/HomeRecentNews/action";
import ShowRecentNews from "../ShowRecentNews";
import Link from "next/link";

const GabRecentNews = async () => {
  const postsData = await getRecentPosts("gabinete");
  return (
    <>
      <div className="mx-auto mb-12 grid max-w-screen-xl grid-cols-1 justify-items-center gap-x-2 gap-y-8 px-10 text-center sm:gap-x-4 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
        <ShowRecentNews data={postsData} />
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
};
export default GabRecentNews;
