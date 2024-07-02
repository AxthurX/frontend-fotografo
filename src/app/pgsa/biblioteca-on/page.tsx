"use client";

import axios from "axios";
import { Markup } from "interweave";
import { useEffect, useState } from "react";

async function getpost() {
  try {
    const res = await axios.get("/api/blog?id=sedam-publicacoes");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function Page() {
  const [post, setPost] = useState<{ content: string } | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const postData: { content: string } = await getpost();
      setPost(postData);
    }
    fetchPost();
  }, []);

  return (
    <div className="container border border-t-0 border-sage-300 bg-beige-100 p-0 px-4 max-sm:border-0 md:px-8 lg:px-12 xl:px-40">
      <div>
        {post ? (
          <Markup
            content={post.content}
            allowAttributes={true}
            allowElements={true}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
