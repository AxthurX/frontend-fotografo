import { CardV2 } from "@/components/CardV2";
import { getRecentPosts } from "@/components/HomeRecentNews/action";
import Link from "next/link";
import PostError from "./HomeRecentNewsError";

const HomeRecentNews = async (props?: { tag?: string }) => {
  const postsData =
    props && props.tag
      ? await getRecentPosts(props.tag)
      : await getRecentPosts();

  if (Array.isArray(postsData)) {
    return (
      <>
        {postsData.map((post) => {
          if (post.id) {
            return (
              <Link
                href={`/post/${post.id}`}
                key={post.id}
                className="h-full min-h-80 w-full"
              >
                <CardV2 className="w-full">
                  {post.cover_image ? (
                    <CardV2.Image
                      src={encodeURI(post.cover_image)}
                      height={240}
                      width={380}
                      alt="Card."
                      className="h-60 bg-coffee-800"
                    />
                  ) : (
                    <div className="h-60 w-full rounded-t-lg bg-coffee-800"></div>
                  )}
                  <CardV2.Body className="flex items-center justify-center">
                    <CardV2.Body.Title className="line-clamp-3 justify-start text-ellipsis text-balance text-start">
                      {post.title}
                    </CardV2.Body.Title>
                  </CardV2.Body>
                </CardV2>
              </Link>
            );
          }
        })}
      </>
    );
  } else {
    return (
      <>
        {Array(6).map(() => {
          <>
            <PostError />
          </>;
        })}
      </>
    );
  }
};

export default HomeRecentNews;
