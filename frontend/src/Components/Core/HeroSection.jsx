import skyGif from "../../assets/Airplane loader.gif";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Sky GIF Background - z-0 places it behind everything */}
      <div className="absolute inset-0 z-0">
        <img
          src={skyGif}
          alt="Sky background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;