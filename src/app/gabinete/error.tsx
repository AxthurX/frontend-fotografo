"use client";

import PostError from "@/components/HomeRecentNews/HomeRecentNewsError";

export default function ErrorFallbackGab({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <>
      <div className="mx-auto my-12 grid max-w-screen-xl grid-cols-1 justify-items-center gap-x-2 gap-y-12 px-10 text-center sm:gap-x-4 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
        <PostError key={1} />
        <PostError key={2} />
        <PostError key={3} />
        <PostError key={4} />
        <PostError key={5} />
        <PostError key={6} />
      </div>
      <div className="mb-16 flex w-full justify-end px-10 xl:px-24">
        <button
          onClick={() => resetErrorBoundary()}
          className="btn btn-secondary text-xl text-beige-50"
        >
          Tentar novamente
        </button>
      </div>
    </>
  );
}
