"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { TPost } from "../action";

export function CarouselClient({
  className,
  posts,
}: {
  posts: TPost[];
  className?: string;
}) {
  return (
    <Carousel
      className={cn("w-full", className)}
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
          rootNode(emblaRoot) {
            return emblaRoot.closest("#carousel");
          },
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {posts.map((_, index) => (
          <CarouselItem key={index}>
            <Link
              href={`/post/${_.id}`}
              id={_.id}
              className="flex h-full flex-col"
            >
              <div className="flex w-full grow flex-col justify-center bg-calpolygreen-700 p-4 text-3xl font-semibold text-beige-50">
                {_.title}
              </div>
              <Image
                src={encodeURI(_.cover_image)}
                width={1400}
                height={400}
                alt={`Imagem de número ${index + 1}.`}
                className="mx-auto max-h-[400px] min-h-[400px] max-w-[100vw] object-cover"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="absolute bottom-4 flex w-full items-center justify-center align-middle">
        {posts.map((_, index) => (
          <CarouselDots key={index} index={index} />
        ))}
      </div>
    </Carousel>
  );
}
