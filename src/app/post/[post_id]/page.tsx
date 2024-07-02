"use client";

import BackButton from "@/components/BackButton";
import FormContainer from "@/components/FormStructure/FormContainer";
import ImageGallery from "@/components/ImageGallery";
import axios from "axios";
import { load } from "cheerio";
import { Markup } from "interweave";
import { Suspense, useEffect, useState } from "react";
import GoogleMaps from "./components/g-maps";
import YoutubeEmbed from "./components/yt-embed";

async function getPost(post_id: string) {
  try {
    const res = await axios.get("/api/blog?id=" + post_id);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

interface Post {
  title: string;
  content: string;
  cover_image: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}

interface Gallery {
  id: number;
  src: string;
}

export default function PostBlog({ params }: { params: { post_id: string } }) {
  const [imageGallery, setImageGallery] = useState<Map<string, Array<Gallery>>>(
    new Map(),
  );
  const [post, setPost] = useState<Post | null>();
  const [loading, setLoading] = useState<boolean>(true);

  function specialElementTransform(node: HTMLElement): React.ReactNode {
    if (Array.from(imageGallery.keys()).includes(node.id)) {
      const images = imageGallery.get(node.id);
      if (images) return <ImageGallery params={{ images }} />;
      else null;
    }
    if (node.tagName === "YOUTUBE") {
      const src = node.getAttribute("src");
      if (src) return <YoutubeEmbed videoSrc={src} />;
      return null;
    }
    if (node.tagName === "GOOGLEMAPS") {
      const src = node.getAttribute("src");
      if (src) return <GoogleMaps src={src} />;
      return null;
    }
  }

  useEffect(() => {
    setLoading(true);
    getPost(params.post_id).then(async (post) => {
      if (post) {
        const gallery: Map<string, Array<Gallery>> = new Map();
        const post_html = load(post.content, null, false);
        const galleryLists = post_html("div[title='gallery']");
        galleryLists.each((listIndex, list) => {
          const imgs: Array<Gallery> = [];
          const listItems = post_html(list).find("img");
          listItems.each((index, item) => {
            const img_src = post_html(item).attr("src");
            if (img_src)
              imgs.push({
                id: index,
                src: img_src,
              });
          });
          if (imgs.length > 0) {
            const galleryId = String(post_html(list).attr("id"));
            gallery.set(galleryId, imgs);
          }
        });
        setImageGallery(gallery);
        const html = post_html.html();

        setPost({ ...post, content: html });
      }
      setLoading(false);
    });
  }, [params.post_id]);

  const formatCreatedAt = {
    year: "numeric" as const,
    month: "2-digit" as const,
    day: "2-digit" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  };

  return (
    <FormContainer className="relative flex grow flex-col">
      <BackButton className="lg:top-5" />
      <div className="flex grow flex-col items-center justify-center">
        <Suspense fallback={<Loading loading={loading} />}>
          {post ? (
            <>
              <section className="-mt-[1px] flex min-h-[112px] w-full flex-col items-center justify-center bg-calpolygreen-900 px-4 py-4 text-beige-50 lg:pl-24 xl:pl-0">
                <h1 className="max-w-[1110px] text-xl font-bold lg:text-4xl">
                  {post && post.title}
                </h1>
              </section>
              <section className="flex w-full grow flex-col">
                <div className="mb-3 border-b border-sage-200">
                  <div className="mx-auto max-w-[1110px]">
                    <h2 className="p-2 text-2xl text-coffee-900">
                      {post &&
                        new Date(post.created_at)
                          .toLocaleDateString("pt-BR", formatCreatedAt)
                          .replace(",", ", às") + "h."}
                    </h2>
                  </div>
                </div>
                <div
                  className="mx-auto mb-8 w-full max-w-[1110px] text-pretty max-[1110px]:mx-4 max-[1110px]:w-[calc(100%-2rem)] md:text-justify"
                  lang="pt-BR"
                >
                  <Markup
                    content={post.content}
                    allowAttributes={true}
                    allowElements={true}
                    transform={specialElementTransform}
                    noWrap
                  />
                </div>
              </section>
              <section className="-mb-[1px] w-full bg-calpolygreen-900 py-4 text-lg font-semibold text-beige-50 lg:px-36">
                Tags:{" "}
                <span className="font-normal text-beige-50 underline">
                  {post.tags.join(", ")}
                </span>
              </section>
            </>
          ) : (
            <Loading loading={loading} />
          )}
        </Suspense>
      </div>
    </FormContainer>
  );
}
function Loading({ loading }: { loading: boolean }) {
  return (
    <>
      {loading == true ? (
        <div className="loading loading-spinner mx-auto my-10 flex w-20">
          Carregando...
        </div>
      ) : (
        <div className="flex size-full flex-col items-center justify-center self-center">
          <h1 className="grow text-4xl font-bold">
            Notícia não encontrada ou não existente.
          </h1>
        </div>
      )}
    </>
  );
}
