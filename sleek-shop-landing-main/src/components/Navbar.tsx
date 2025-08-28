import { useState } from "react";
import { Menu, X, ShoppingCart, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import siteLogo from "@/assets/nexora_nest.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "#contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        Free shipping on all Singapore orders above S$70. International delivery available.
      </div>
      
      {/* Social Icons Bar */}
      <div className="bg-background py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-end space-x-4">
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
      
      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Logo - Centered */}
            <div className="py-4 flex justify-center w-full">
              <img
                src={siteLogo}
                onClick={() => navigate("/")}
                alt="Shop Logo"
                className="h-16 cursor-pointer"
              />
            </div>
            
            {/* Navigation Items */}
            <div className="hidden md:flex justify-center w-full pb-4">
              <div className="flex items-center space-x-12">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-colors duration-200 text-sm uppercase tracking-wider ${
                      isActive(item.href)
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                <a 
                  href="/products" 
                  className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-200"
                >
                  Shop Now
                </a>
                <button 
                  className="relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile Header */}
            <div className="md:hidden w-full flex justify-between items-center py-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-primary"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/products"
                  className="block px-3 py-2 text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Shop Now
                </a>
              </div>
            </div>
          )}
        </div>
        
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </nav>
    </>
  );
};

export default Navbar;
