// "use client";

// import { useState } from "react";
// import SearchBar from "@/components/SearchBar";
// import FilterSection from "@/components/FilterSection";
// import PropertyCard from "@/components/PropertyCard";
// import PropertyDetails from "@/components/PropertyDetailsModal";
// import { properties } from "@/data/properties";
// //import GoogleMap from "@/components/GoogleMap";

// import dynamic from "next/dynamic";

// const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
//   ssr: false,
// });

// import { Property } from "@/types/property";
// import { motion } from "framer-motion";

// export default function Home() {
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(
//     null
//   );

//   const handlePropertyClick = (property: Property) => {
//     setSelectedProperty(property);
//   };

//   const handleCloseDetails = () => {
//     setSelectedProperty(null);
//   };

//   // Get similar properties (filter by same city and price range)
//   const getSimilarProperties = (property: Property) => {
//     return properties
//       .filter(
//         (p) =>
//           p.id !== property.id &&
//           p.city === property.city &&
//           Math.abs(p.price - property.price) < property.price * 0.5
//       )
//       .slice(0, 3);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {selectedProperty ? (
//         <PropertyDetails
//           key={selectedProperty.id} // 👈 this forces re-render when property changes
//           property={selectedProperty}
//           onClose={handleCloseDetails}
//           similarProperties={getSimilarProperties(selectedProperty)}
//           onPropertyClick={handlePropertyClick}
//         />
//       ) : (
//         <main className="max-w-7xl mx-auto px-4 py-8">
//           <motion.h1
//             className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] mb-6"
//             initial={{ opacity: 0, y: -20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             Find Your Next Deal
//           </motion.h1>

//           <div className="flex flex-col-reverse lg:flex-row gap-6 h-auto lg:h-screen">
//             <div className="w-full lg:w-3/5 space-y-6 overflow-y-auto p-4 lg:h-screen">
//               <SearchBar />
//               <FilterSection total={properties.length} />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
//                 {properties.map((property) => (
//                   <PropertyCard
//                     key={property.id}
//                     property={property}
//                     onClick={() => handlePropertyClick(property)}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="w-full lg:w-2/5 bg-gray-200 rounded-lg overflow-hidden h-72 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center">
//               <GoogleMap />
//             </div>
//           </div>
//         </main>
//       )}
//     </div>
//   );
// }


// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import FilterSection from "@/components/FilterSection";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import dynamic from "next/dynamic";
import { Property } from "@/types/property";
import { motion } from "framer-motion";

const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  const handlePropertyClick = (property: Property) => {
    router.push(`/deal/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] mb-6"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Find Your Next Deal
        </motion.h1>

        <div className="flex flex-col-reverse lg:flex-row gap-6 h-auto lg:h-screen">
          <div className="w-full lg:w-3/5 space-y-6 overflow-y-auto p-4 lg:h-screen">
            <SearchBar />
            <FilterSection total={properties.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => handlePropertyClick(property)}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/5 bg-gray-200 rounded-lg overflow-hidden h-72 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center">
            <GoogleMap />
          </div>
        </div>
      </main>
    </div>
  );
}