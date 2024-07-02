"use server";

type TImageExtensions = ".jpeg" | ".jpg" | ".png" | ".gif" | ".svg" | ".webp" | ".avif";

export type TPost = {
    id: string;
    title: string;
    cover_image: `https://${string}${TImageExtensions}` | `http://${string}${TImageExtensions}`;
    tags: string[];
}

export async function getRecentPosts({ tags, limit }: { tags: string, limit: number }): Promise<TPost[]> {
    const response = await fetch(`${process.env.BLOG_SERVICE_IP}/blog?limit=${limit}&tags=${tags}`, { cache: "no-store" })
    .catch(() => {
        throw new Error("Erro ao solicitar notícias recentes para o carrossel.");
    });
        const data: { posts: TPost[] } = await response.json()
        .catch(() => {
            throw new Error("Erro ao solicitar notícias recentes para o carrossel.");
        });
        return data.posts;
}