"use client";
import { FaFilter } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

interface FilterSectionProps {
  total: number;
}

const FilterSection = ({ total }: FilterSectionProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    Price: "",
    "Home type": "",
    "Beds / Baths": "",
    Available: "",
    Sort: "Latest",
  });

  const filterOptions: Record<string, string[]> = {
    Price: ["Any", "$0-$500", "$500-$1,000", "$1,000-$1,500", "$1,500+"],
    "Home type": ["Any", "House", "Apartment", "Condo", "Townhouse"],
    "Beds / Baths": ["Any", "1+", "2+", "3+", "4+"],
    Available: ["Any", "Available now", "Next 30 days", "Next 90 days"],
    Sort: ["Latest", "Price: Low to High", "Price: High to Low", "Most popular"],
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleFilterSelect = (label: string, value: string) => {
    setSelectedFilters({ ...selectedFilters, [label]: value });
    setActiveDropdown(null);
  };

  return (
    <div className="flex flex-col py-4 border-b border-gray-200 z-20 relative">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left side: Filters */}
        <div className="flex flex-wrap gap-3 items-center relative z-30">
          {["Price", "Home type", "Beds / Baths", "Available"].map((label) => (
            <div key={label} className="relative">
              <button
                onClick={() => toggleDropdown(label)}
                className={`flex items-center justify-between gap-1 border text-sm px-4 py-2 rounded-full transition ${
                  selectedFilters[label]
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-800 hover:border-gray-400"
                }`}
              >
                {selectedFilters[label] || label}
                {activeDropdown === label ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>

              {activeDropdown === label && (
                <div className="absolute z-50 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                  {filterOptions[label].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect(label, option)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedFilters[label] === option
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* All Filters Button */}
          <button className="flex items-center gap-2 border border-gray-300 text-sm text-gray-800 px-4 py-2 rounded-full bg-white hover:border-gray-400 transition">
            <FaFilter className="w-4 h-4" />
            All filters
          </button>
        </div>

        {/* Right side: Sort */}
        <div className="flex items-center justify-between text-sm text-gray-500 w-full">
          {/* Left: Results found */}
          <span className="ml-2 font-medium">
            <span className="font-semibold text-gray-900">
              {total > 50 ? "50+" : total}
            </span>{" "}
            results found
          </span>

          {/* Right: Sort Dropdown */}
          <div className="flex items-center space-x-1 relative z-30">
            <span>Sort:</span>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("Sort")}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {selectedFilters["Sort"]}
                {activeDropdown === "Sort" ? (
                  <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {activeDropdown === "Sort" && (
                <div className="absolute right-0 z-50 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                  {filterOptions["Sort"].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect("Sort", option)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedFilters["Sort"] === option
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
