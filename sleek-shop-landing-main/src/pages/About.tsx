import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About ShopFlow
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your trusted partner for premium products and exceptional shopping experiences
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Our Story */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Our Story</h2>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  At ShopFlow, we believe that shopping should be effortless, enjoyable, and accessible to everyone. 
                  Since our founding, we've been committed to curating the finest selection of products that enhance 
                  your lifestyle while maintaining the highest standards of quality and affordability.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Our mission is simple: to provide you with premium products at unbeatable prices, backed by 
                  exceptional customer service. We carefully select each item in our catalog, ensuring that 
                  every purchase meets our rigorous standards for quality, functionality, and value.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Whether you're looking for the latest tech gadgets, fashion accessories, home essentials, or 
                  fitness gear, ShopFlow is your trusted partner in discovering products that truly make a 
                  difference in your daily life.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-2xl bg-card border border-border">
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card border border-border">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Products Available</div>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card border border-border">
                <div className="text-4xl font-bold text-primary mb-2">99%</div>
                <div className="text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>

            {/* Our Values */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Quality First</h3>
                  <p className="text-muted-foreground">
                    Every product in our catalog undergoes rigorous quality testing to ensure it meets our high standards.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Customer Centric</h3>
                  <p className="text-muted-foreground">
                    Our customers are at the heart of everything we do. We're committed to providing exceptional service.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously evolve our platform and services to provide the best shopping experience.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to sustainable practices and responsible sourcing for a better future.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                We'd love to hear from you. Get in touch with our team.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;