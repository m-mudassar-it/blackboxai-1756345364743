import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/banner.avif";

const HeroBanner = () => {
  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative h-[80vh] md:h-[90vh]">
        <img
          src={heroBanner}
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight max-w-3xl">
            Sourdough Supplies
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl">
            Supplying quality kitchen tools and flours, to help you to eat, drink, and live better.
          </p>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-sm uppercase tracking-wider px-8 py-6"
            onClick={() => {
              const element = document.getElementById('products');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Shop Supplies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
