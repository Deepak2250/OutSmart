import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 w-full"
    >
      <input
        type="text"
        placeholder="Where do you want to go?"
        className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors w-full md:w-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
