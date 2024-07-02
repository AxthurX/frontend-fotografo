"use server";

import axios from "axios";

export async function getPost(post_id: string) {
  try {
    const res = await axios.get(
      `${process.env.BLOG_SERVICE_IP}/blog/post?id=${post_id}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export interface IPost {
  title: string;
  content: string;
  cover_image: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}