


import { IPost } from "@/lib/getPost";
import { Markup } from "interweave";

const ShowPost = ({ post }: { post: IPost }) => {
  return (
    <>
      <div className="my-6 flex flex-col items-center justify-center">
        <Markup
          className="mx-auto max-w-7xl px-10"
          content={post.content}
          allowAttributes={true}
          allowElements={true}
        />
      </div>
    </>
  );
};

export default ShowPost;
