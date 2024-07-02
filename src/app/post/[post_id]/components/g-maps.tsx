export default function GoogleMaps({ src }: { src: string }) {
  return (
    <iframe
      className="aspect-square h-auto w-full"
      loading="lazy"
      title="Google Maps"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
    />
  );
}
