const trips = [
  {
    id: 1,
    image: "https://source.unsplash.com/featured/?paris",
    name: "Paris",
    description: "The city of lights, romance, and culture."
  },
  {
    id: 2,
    image: "https://source.unsplash.com/featured/?tokyo",
    name: "Tokyo",
    description: "A vibrant blend of tradition and technology."
  },
  {
    id: 3,
    image: "https://source.unsplash.com/featured/?bali",
    name: "Bali",
    description: "A tropical paradise with beaches and temples."
  }
];

const TripListSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
          Trip List
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white text-black rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={trip.image}
                alt={trip.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{trip.name}</h3>
                <p className="text-sm text-gray-700">{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripListSection;
