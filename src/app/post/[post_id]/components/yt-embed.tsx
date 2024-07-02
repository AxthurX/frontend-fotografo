export default function YoutubeEmbed({ videoSrc }: { videoSrc: string }) {
  const regex = /(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = videoSrc.match(regex);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      className="aspect-video h-auto w-full"
      src={"https://www.youtube.com/embed/" + videoId}
      title="YouTube video player"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
}
