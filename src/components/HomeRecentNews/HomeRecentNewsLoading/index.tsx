import PostSkeleton from "@/components/PostSkeleton";

const HomeRecentNewsLoading = () => {
  return (
    <>
      {Array.from({ length: 6 }).map(() => {
        return <PostSkeleton key={Math.random()} />;
      })}
    </>
  );
};

export default HomeRecentNewsLoading;
