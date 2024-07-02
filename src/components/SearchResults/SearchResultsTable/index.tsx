import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

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
    | `http://${string}${TImageExtensions}`
    | `/ext-files/${string}${TImageExtensions}`;
  tags: string[];
  created_at: string;
};

export default function SearchResultsTable({ posts }: { posts: TPost[] }) {
  return (
    <Fragment>
      {posts &&
        posts.map((post) => {
          if (post !== null)
            return (
              <Link
                className="relative flex w-full flex-col border-t-sage-500 p-4 hover:brightness-150 active:brightness-150 max-sm:border max-sm:border-sage-300 max-sm:border-opacity-50"
                href={`/post/${post.id}`}
                key={post.id}
              >
                <div className="absolute inset-0 overflow-hidden">
                  {post.cover_image ? (
                    <Image
                      className="bg-coffee-800 object-cover blur-[2px] brightness-[66%] filter max-sm:hidden"
                      src={encodeURI(`${post.cover_image}`)}
                      fill
                      alt="Imagem da notícia."
                    />
                  ) : (
                    <div className="h-full w-full bg-coffee-800 blur-[2px] filter max-sm:hidden"></div>
                  )}
                </div>
                <div className="text-shadow relative text-beige-50 max-sm:text-coffee-950">
                  <p className="text-3xl font-semibold max-sm:text-lg max-sm:text-coffee-950 sm:mb-4">
                    {post.title}
                  </p>

                  <p className="flex justify-between text-base sm:text-xl">
                    <span className="font-semibold">
                      Tags:{" "}
                      <span className="font-normal">
                        {post.tags.join(", ")}
                      </span>
                    </span>
                  </p>
                  <p className="text-base sm:text-xl">
                    <span className="font-semibold">Data de publicação: </span>{" "}
                    {format(post.created_at, "dd/MM/yyyy")}
                  </p>
                </div>
              </Link>
            );
        })}
    </Fragment>
  );
}
