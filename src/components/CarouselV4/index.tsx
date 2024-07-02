import { CarouselClient } from "./CarouselClient";
import { getRecentPosts } from "./action";

interface CarouselV4Props {
  tags?: string;
  limit?: number;
}

export default async function CarouselV4({
  tags = "notícias,destaques",
  limit = 5,
}: CarouselV4Props) {
  const postsData = await getRecentPosts({ tags, limit });
  return <CarouselClient posts={postsData} className="max-w-[1400px]" />;
}
