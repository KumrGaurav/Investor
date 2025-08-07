// app/deal/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyDetails from "@/components/PropertyDetailsModal";
import { properties } from "@/data/properties";
import { Property } from "@/types/property";

export default function DealPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Find the property with matching ID
    const foundProperty = properties.find(p => p.id === parseInt(id));
    
    if (foundProperty) {
      setProperty(foundProperty);
      // Get similar properties
      const similar = properties
        .filter(
          (p) =>
            p.id !== parseInt(id) &&
            p.city === foundProperty.city &&
            Math.abs(p.price - foundProperty.price) < foundProperty.price * 0.5
        )
        .slice(0, 3);
      setSimilarProperties(similar);
    } else {
      // Property not found, redirect to home
      router.push('/');
    }
  }, [id, router]);

  const handleCloseDetails = () => {
    router.push('/');
  };

  const handlePropertyClick = (property: Property) => {
    router.push(`/deal/${property.id}`);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <PropertyDetails
      property={property}
      onClose={handleCloseDetails}
      similarProperties={similarProperties}
      onPropertyClick={handlePropertyClick}
      isPageView={true}
    />
  );
}