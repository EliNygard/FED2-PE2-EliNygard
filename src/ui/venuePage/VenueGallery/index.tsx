"use client";

import { IMedia } from "@/interface";
import Image from "next/image";
// import { useState } from "react";

// self made grid on mobile?
// shadcn Carousel for md screens and up

export default function VenueGallery({
  venueImages,
  firstVenueImage,
}: {
  venueImages: IMedia[];
  firstVenueImage: IMedia;
}) {
  // const [isOpen, setIsOpen] = useState(false);

  console.log(venueImages);
  console.log(firstVenueImage);

  return (
      <div className="relative rounded w-full aspect-video">
        <Image
          src={firstVenueImage.url}
          alt={firstVenueImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          loading="lazy"
          className="rounded"
        />
      </div>
  );
}
