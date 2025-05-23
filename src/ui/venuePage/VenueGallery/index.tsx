"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMedia } from "@/interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * VenueGallery displays a grid of the venue image(s).
 * - The component is part of the VenuePage
 * - The user can click on an image in the grid and a full screen view opens.
 * @param venue The venue images.
 */

export default function VenueGallery({
  venueImages,
}: {
  venueImages: IMedia[];
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    // This renders on SSR *and* on first client pass
    return <div className="aspect-video max-h-[500px] w-full bg-gray-100" />;
  }

  const imageCount = venueImages.length;
  // console.log(venueImages);

  let gridClasses = "";
  if (imageCount <= 2) {
    gridClasses = "grid-cols-1 xl:max-w-[1040px] m-auto";
  } else if (imageCount >= 5) {
    gridClasses =
      "grid-cols-1 md:grid-cols-[65%_1fr] md:grid-rows-2 xl:grid-cols-[55%_1fr_1fr] xl:grid-rows-2";
  } else {
    gridClasses = "grid-cols-1 md:grid-cols-[65%_1fr] md:grid-rows-2";
  }

  const count = isXl ? 5 : isMd ? 3 : 1;
  const imagesToShow = venueImages.slice(0, count);

  const spanClasses = (index: number) => {
    if (isMd && !isXl) {
      if (index === 0) return "md:col-start-1 md:row-span-2";
      if (index === 1) return "md:col-start-2 md:row-start-1";
      if (index === 2) return "md:col-start-2 md:row-start-2";
      return "";
    }
    if (isXl) {
      if (index === 0) return "xl:col-start-1 xl:row-span-2";
      if (index === 1) return "xl:col-start-2 xl:row-start-1";
      if (index === 2) return "xl:col-start-3 xl:row-start-1";
      if (index === 3) return "xl:col-start-2 xl:row-start-2";
      if (index === 4) return "xl:col-start-3 xl:row-start-2";
      return "";
    }
    return "";
  };

  return (
    <>
      <div
        className={`aspect-video max-h-[500px] w-full grid gap-2 ${gridClasses}`}
      >
        {imagesToShow.length >= 1 ? (
          imagesToShow.map((img, index) => (
            <button
              key={img.url}
              className={`relative overflow-hidden rounded ${spanClasses(index)}`}
              aria-label={`View image ${index + 1} of ${venueImages.length}`}
              onClick={() => openGallery(index)}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
                className="rounded cursor-pointer"
                quality={30}
              />
            </button>
          ))
        ) : (
          <div className="relative">
            <Image
              src="/LogoMountainsV.svg"
              alt="default image of venue"
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-1">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Carousel</DialogTitle>
          </DialogHeader>
          <Carousel
            defaultValue={activeIndex.toString()}
            onChange={(value) => setActiveIndex(Number(value))}
            className="w-full h-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {venueImages.map((image, index) => (
                <CarouselItem defaultValue={index.toString()} key={image.url}>
                  <div className="relative aspect-video rounded-md">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="50vw"
                      style={{ objectFit: "contain", borderRadius: "6px" }}
                      className="bg-primary-font"
                    />
                  </div>
                  {image.alt ? (
                    <div className="pt-1.5 text-xs md:text-sm">
                      <p className="text-center text-sm md:text-base">
                        {`Image ${index + 1}: ${image.alt}`}
                      </p>
                    </div>
                  ) : (
                    <div className="pt-1.5">
                      <p className="text-center text-xs md:text-sm">
                        {`Image ${index + 1} of ${venueImages.length}`}
                      </p>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Previous Image" />
            <CarouselNext aria-label="Next Image" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
