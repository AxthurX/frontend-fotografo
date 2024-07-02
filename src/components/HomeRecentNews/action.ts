"use server";

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

export async function getRecentPosts(
  tag?: string,
): Promise<TPost[] | undefined> {
  const response = await fetch(
    `${process.env.BLOG_SERVICE_IP}/blog?limit=6&tags=${
      tag && tag.length > 0 ? tag : ""
    }`,
    { cache: "no-store" },
  ).catch(() => {
    throw new Error(
      "Erro ao solicitar notícias recentes para a seção de notícias.",
    );
  });
  if (response) {
    const data: { posts: TPost[] } = await response.json().catch(() => {
      throw new Error(
        "Erro ao solicitar notícias recentes para a seção de notícias.",
      );
    });
    return data.posts;
  }
}
