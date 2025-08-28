import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="max-w-md mx-auto text-center mb-12">
          <h3 className="text-lg font-medium mb-4">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Subscribe and receive exclusive information and offers!
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 border border-r-0 border-border focus:outline-none"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 text-sm uppercase tracking-wider">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-border pt-12">
          {/* Company Info */}
          <div>
            <h4 className="text-sm font-medium uppercase mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-medium uppercase mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Best Sellers
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium uppercase mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary hover:text-primary-light transition-colors">
                <Mail size={18} />
              </a>
              <a href="#" className="text-primary hover:text-primary-light transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-primary hover:text-primary-light transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-primary hover:text-primary-light transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Sourdough Supplies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
