// components/SearchBar.tsx
import React from 'react';
//import Button from './Button';

// components/SearchBar.tsx
const SearchBar = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <input
          type="text"
          placeholder="Search by city, zip, or address"
          className="flex-grow p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full md:w-auto">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;