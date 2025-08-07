"use client";

import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { FiHeart, FiShare2, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { BsCalendar } from "react-icons/bs";
import dynamic from "next/dynamic";
import SafeImage from "./SafeImage";
import FloatingInput from "./FloatingInput";
import PropertyCard from "./PropertyCard";
import { FaBed, FaRuler, FaShower } from "react-icons/fa";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/utils/lib/utils";

import { Button } from "@/components/ui/stateful-button";

const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  ssr: false,
});

// dummy API call
const handleClick = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
};

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
  similarProperties: Property[];
  onPropertyClick: (property: Property) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onClose,
  similarProperties,
  onPropertyClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"available" | "sold">("available");

  // Scroll to top when property changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [property]);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedArvPrice = property.arvPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(property.arvPrice)
    : null;

  const filteredProperties =
    activeTab === "available"
      ? similarProperties.filter((p) => p.status === "FOR SALE")
      : similarProperties.filter((p) => p.status === "SOLD");

  return (
    <div className="relative bg-white">
      {/* Header - Changed from fixed to relative */}
      <div className="relative bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2" />
            Back to results
          </button>
          <div className="flex space-x-4">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite ? "text-red-500" : "text-gray-500"
              } hover:bg-gray-100`}
            >
              <FiHeart className={isFavorite ? "fill-current" : ""} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
              <FiShare2 />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {property.address}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                property.status === "FOR SALE"
                  ? "bg-green-100 text-green-800"
                  : property.status === "FOR RENT"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {property.status}
            </span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FiMapPin className="mr-1" />
            <span>
              {property.city}, {property.state} {property.zip}
            </span>
          </div>
          {property.listingType && (
            <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit mb-4">
              <span>{property.listingType}</span>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="mb-8">
          <div className="rounded-xl overflow-hidden h-64 md:h-96 relative bg-gray-200">
            <SafeImage property={property} className="object-cover" priority />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Info */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div>
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formattedPrice}
                  </span>
                  {formattedArvPrice && (
                    <div className="mt-2">
                      <span className="text-gray-600">ARV: </span>
                      <span className="font-medium">{formattedArvPrice}</span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Listing ID: {property.id}
                </span>
              </div>

              <ul className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
                <li className="flex items-center mr-4">
                  <FaBed className="mr-1" />
                  <span>{property.beds}</span>
                </li>
                <li className="flex items-center mr-4">
                  <FaShower className="mr-1" />
                  <span>{property.baths}</span>
                </li>
                <li className="flex items-center mr-4">
                  <FaRuler className="mr-1" />
                  <span>{property.sqft.toLocaleString()}</span>
                </li>
                <li className="flex items-center">
                  <FiMapPin className="mr-1" />
                  <span>{property.county}</span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <p className="text-gray-700 mb-4">
                This {property.beds}-bedroom, {property.baths}-bathroom property
                is located in {property.city}, {property.state}. With{" "}
                {property.sqft.toLocaleString()} sqft of living space, it offers
                great potential.
              </p>
              <p className="text-gray-700">
                The property is listed {property.status.toLowerCase()} in{" "}
                {property.county} county.
                {property.arvPrice && ` Estimated ARV: ${formattedArvPrice}.`}
              </p>
            </div>

            {/* Map */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-64 rounded-lg overflow-hidden bg-gray-200">
                <GoogleMap />
              </div>
            </div>
          </div>

          {/* Right Contact Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Contact Agent
              </h2>
              <form className="space-y-4">
                <LabelInputContainer>
                  <Label htmlFor="yourname">Your Name</Label>
                  <Input id="yourname" placeholder="Name" type="text" />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="number">Phone Number</Label>
                  <Input id="number" placeholder="123-456-789" type="number" />
                </LabelInputContainer>
                <FloatingInput label="Your Message" type="textarea" />

                <div className="flex h-40 w-full items-center justify-center">
                  <Button onClick={handleClick}>Send message</Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Deals Nearby */}
        <div className="w-full mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Deals Nearby</h2>
            <div className="bg-gray-100 p-1 rounded-full flex items-center space-x-1">
              <button
                onClick={() => setActiveTab("available")}
                className={`px-4 py-1 text-sm rounded-full ${
                  activeTab === "available"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setActiveTab("sold")}
                className={`px-4 py-1 text-sm rounded-full ${
                  activeTab === "sold"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Sold
              </button>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4">
                {filteredProperties.map((prop) => (
                  <div key={prop.id} className="flex-shrink-0 w-72">
                    <PropertyCard
                      property={prop}
                      compact
                      onClick={() => onPropertyClick(prop)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg font-medium">
                🚫 No {activeTab === "sold" ? "Sold" : "Available"} Properties
                Found
              </p>
              <p className="mt-2 text-sm">
                Try switching tabs or come back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default PropertyDetails;
