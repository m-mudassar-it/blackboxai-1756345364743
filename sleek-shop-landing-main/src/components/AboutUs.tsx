const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-secondary aspect-square flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-2xl font-medium mb-4">We have jars for everything</h3>
              <p className="text-muted-foreground mb-6">
                Featured in Martha Stewart's Living Magazine, WECK jars are multipurpose high-quality glass jars made in Germany.
              </p>
              <p className="text-muted-foreground mb-6">
                WECK jars are fridge safe, freezer safe, microwave safe, oven safe, and dishwasher safe. BPA free.
              </p>
              <button className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-sm uppercase tracking-wider transition-colors">
                Learn more
              </button>
            </div>
          </div>
          
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h2 className="section-title text-left">
              Featured Brands
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-2">WECK Jars</h3>
                <p className="text-muted-foreground">
                  At the beginning of the last century, the J. WECK Company was founded in Öflingen Germany. Today, all our WECK jars are still made in Germany.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Wholegrain Milling Co.</h3>
                <p className="text-muted-foreground">
                  Wholegrain Milling Co. is a family-owned business that has been producing high-quality organic flours since 1984.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Falcon Enamelware</h3>
                <p className="text-muted-foreground">
                  Falcon Enamelware has been an icon of British home life since the 1920s. Durable, timeless, and versatile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
