"use client";

import { IMedia } from "@/interface";
import Image from "next/image";
// import { useState } from "react";
import { useMediaQuery } from "react-responsive";

// TODO
// gallery opens: self made grid on mobile? 
// gallery opens: shadcn Carousel for md screens and up
// if fewer images, edit grid

export default function VenueGallery({
  venueImages,
}: {
  venueImages: IMedia[];
}) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);

  // const openGallery = (index: number) => {
  //   setActiveIndex(index);
  //   setIsOpen(true);
  // };

  const isMd = useMediaQuery({ query: "(min-width: 768px" });
  const isXl = useMediaQuery({ query: "(min-width: 1280px" });

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
        className="
        aspect-video
        max-h-[500px]
        w-full
          grid 
          grid-cols-1
          md:grid-cols-[65%_1fr] md:grid-rows-2
          xl:grid-cols-[55%_1fr_1fr] xl:grid-rows-2 
          gap-2
        "
      >
        {imagesToShow.map((img, i) => (
          <button
            key={img.url}
            className={`
              relative
              overflow-hidden
              
              
              
              rounded 
              ${spanClasses(i)}
            `}
            aria-label={`View image ${i + 1} of ${venueImages.length}`}
            // onClick={() => openGallery(i)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
              className="rounded"
              quality={30}
            />
          </button>
        ))}
      </div>
    </>
  );
}
