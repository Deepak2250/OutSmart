import Header from '../Components/Core/Header';
import HeroSection from '../Components/Core/HeroSection';
import SearchSection from '../Components/Core/SearchSection';
import TripListSection from '../Components/Core/TripSection';

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      <SearchSection />
      <TripListSection/>
    </div>
  );
};

export default Home;