"use client";

import { Property } from "@/types/property";
import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  property: Property;
  className?: string;
  priority?: boolean;
}

// ✅ Move this above to avoid ReferenceError
const fallbackImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // Modern house
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6", // Luxury home
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d", // Cozy interior
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea", // City apartment
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00", // Suburban home
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // Modern house
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6", // Luxury home
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d", // Cozy interior
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea", // City apartment
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00", // Suburban home

];

// ✅ Now the function can safely access fallbackImages
function getInitialImage(property: Property) {
  return property.imageUrl || fallbackImages[property.id % fallbackImages.length];
}

const SafeImage = ({
  property,
  className = "",
  priority = false,
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(getInitialImage(property));

  function handleError() {
    const currentIndex = fallbackImages.findIndex((img) => img === imgSrc);
    const nextIndex = (currentIndex + 1) % fallbackImages.length;
    setImgSrc(fallbackImages[nextIndex]);
  }

  return (
    <Image
      src={imgSrc}
      alt={`${property.address} in ${property.city}, ${property.state}`}
      fill
      className={`object-cover ${className}`}
      onError={handleError}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
    />
  );
};

export default SafeImage;
