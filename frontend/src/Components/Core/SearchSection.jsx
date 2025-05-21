import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">
          Explore Destinations
        </h2>

        {/* White Search Container */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
