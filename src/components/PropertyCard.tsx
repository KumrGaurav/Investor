"use client";

import { IconBath, IconBed, IconHeart, IconRulerMeasure } from "@tabler/icons-react";
import { Property } from "@/types/property";
import { motion } from "framer-motion";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
  onClick?: () => void;
}

const PropertyCard = ({ property, compact = false, onClick }: PropertyCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [liked, setLiked] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <motion.div
      className={`relative w-full ${compact ? 'max-w-xs' : 'max-w-md'} overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer`}
      whileHover={{ y: compact ? 0 : -5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Property Image */}
      <div className={`relative ${compact ? 'h-40' : 'h-48'} w-full overflow-hidden`}>
        <SafeImage 
          property={property}
          className="transition-transform duration-500 hover:scale-105"
          priority={!compact}
        />

        {/* Status Badge */}
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-blue-600 backdrop-blur-sm">
            {property.status}
          </span>
          {property.listingType && (
            <span className="rounded-full bg-green-100/90 px-2 py-1 text-xs font-semibold text-green-800 backdrop-blur-sm">
              {property.listingType}
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute right-4 top-4 z-10"
          aria-label="Like"
        >
          <IconHeart
            className={`w-5 h-5 transition-colors ${liked ? "text-red-500 fill-red-500" : "text-white"}`}
            stroke={1.5}
            fill={liked ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Property Details */}
      <div className={`p-4 ${compact ? 'space-y-2' : 'space-y-3'}`}>
        <div>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>
            ${formatPrice(property.price)}
          </h3>
          <p className={`${compact ? 'text-sm' : 'text-base'} text-gray-600 truncate`}>
            {property.address}
          </p>
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500`}>
            {property.city}, {property.state}
          </p>
        </div>

        <div className={`flex justify-around ${compact ? 'py-1' : 'py-2'} rounded-lg bg-gray-50`}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-gray-700">
              <IconBed className={`${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
              <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium`}>
                {property.beds}
              </span>
            </div>
            <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-gray-500`}>Beds</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-gray-700">
              <IconBath className={`${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
              <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium`}>
                {property.baths}
              </span>
            </div>
            <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-gray-500`}>Baths</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-gray-700">
              <IconRulerMeasure className={`${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
              <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium`}>
                {property.sqft.toLocaleString('en-US')}
              </span>
            </div>
            <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-gray-500`}>Sqft</span>
          </div>
        </div>

        {!compact && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Details
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;