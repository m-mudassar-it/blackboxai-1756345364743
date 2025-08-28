import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import BestOffers from "@/components/BestOffers";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <FeaturedProducts />
      <BestOffers />
      <Categories />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
