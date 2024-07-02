import { CardV2 } from "@/components/CardV2";
import Link from "next/link";

type TImageExtensions =
  | ".jpeg"
  | ".jpg"
  | ".png"
  | ".gif"
  | ".svg"
  | ".webp"
  | ".avif";

type TPost = {
  id: string;
  title: string;
  cover_image:
  | `https://${string}${TImageExtensions}`
  | `http://${string}${TImageExtensions}`;
  tags: string[];
};

const ShowRecentNews = ({ data }: { data: TPost[] | undefined }) => {
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((post) => {
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
      {(data == undefined || data.length == 0) && (
        <>
          <span className="mx-auto flex my-3 font-semibold">
            Nenhuma notícia foi encontrada.
          </span>
        </>
      )}
    </>
  );
};
export default ShowRecentNews;
