"use client";

import { ChevronLeft, ChevronRight, Fullscreen } from "lucide-react";
import Image from "next/image";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

export interface GalleryImage {
  id: number;
  src: string;
}

export default function ImageGallery({
  params,
}: {
  params: { images: Array<GalleryImage> };
}) {
  const [gallery, setGallery] = useState<Array<GalleryImage>>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setGallery(params.images);
  }, [params.images]);

  const onTouchStart = (e: TouchEvent<HTMLImageElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent<HTMLImageElement>) => {
    const endX = e.changedTouches[0].clientX;
    if (gallery && startX - endX > 60) {
      // Swipe left
      setCurrentIndex((currentIndex + 1) % gallery.length);
    } else if (gallery && endX - startX > 60) {
      // Swipe right
      setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const onMouseDown = (e: MouseEvent<HTMLImageElement>) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const onMouseUp = (e: MouseEvent<HTMLImageElement>) => {
    if (!isDragging) return;
    const endX = e.clientX;
    if (gallery && startX - endX > 100) {
      // Drag left
      setCurrentIndex((currentIndex + 1) % gallery.length);
    } else if (gallery && endX - startX > 100) {
      // Drag right
      setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length);
    }
    setIsDragging(false);
  };

  const imageRef = useRef<HTMLImageElement>(null);

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else if (imageRef.current) {
      if (imageRef.current.requestFullscreen) {
        imageRef.current.requestFullscreen();
      }
    }
  };

  return (
    <>
      {gallery ? (
        <div
          className="group flex aspect-[37/20] w-full flex-row max-md:flex-col-reverse md:border-x md:border-x-sage-200"
          aria-roledescription="Galeria de imagens"
        >
          <div
            className="grid grid-cols-2 overflow-y-auto max-md:inline-flex max-md:gap-0 md:aspect-[7/20]"
            aria-label="Grade de miniaturas de imagens"
          >
            {gallery.map((image, index) => (
              <Image
                key={image.src}
                quality={25}
                alt={"Miniatura da imagem número " + (index + 1)}
                height={98}
                width={98}
                className="aspect-square object-cover md:h-full md:w-full"
                src={encodeURI(image.src)}
                onClick={() => {
                  setCurrentIndex(image.id);
                }}
              />
            ))}
          </div>
          {/* Foto principal */}
          <div className="relative aspect-[3/2] bg-black">
            <Image
              ref={imageRef}
              alt="Imagem atual da galeria."
              className="aspect-[3/2] object-scale-down"
              quality={75}
              width={900}
              height={600}
              src={encodeURI(gallery[currentIndex].src)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
            />
            <button
              onClick={() => {
                setCurrentIndex(
                  currentIndex + -1 < 0 ? gallery.length - 1 : currentIndex - 1,
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-3 opacity-0 transition duration-500 animate-in fade-in group-hover:opacity-100 max-md:p-1.5"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                setCurrentIndex(
                  currentIndex + 1 > gallery.length - 1 ? 0 : currentIndex + 1,
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-3 opacity-0 transition duration-500 animate-in fade-in group-hover:opacity-100 max-md:p-1.5"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={handleFullscreen}
              className="absolute bottom-4 right-4 transform rounded-full bg-white bg-opacity-50 p-1.5 opacity-0 transition duration-500 animate-in fade-in group-hover:opacity-100 md:hidden"
            >
              <Fullscreen size={16} />
            </button>
          </div>
          <div className="hidden" id="preloads">
            <Image
              alt="Image before previous"
              src={encodeURI(
                gallery[(currentIndex - 2 + gallery.length) % gallery.length]
                  .src,
              )}
              priority
              quality={75}
              width={900}
              height={600}
              className="hidden"
            />
            <Image
              alt="Previous image"
              src={encodeURI(
                gallery[(currentIndex - 1 + gallery.length) % gallery.length]
                  .src,
              )}
              priority
              quality={75}
              width={900}
              height={600}
              className="hidden"
            />
            <Image
              alt="Next image"
              src={encodeURI(gallery[(currentIndex + 1) % gallery.length].src)}
              priority
              quality={75}
              width={900}
              height={600}
              className="hidden"
            />
            <Image
              alt="Image after next"
              src={encodeURI(gallery[(currentIndex + 2) % gallery.length].src)}
              priority
              quality={75}
              width={900}
              height={600}
              className="hidden"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
