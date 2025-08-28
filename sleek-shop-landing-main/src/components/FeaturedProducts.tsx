import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const products = [
    {
      id: "1",
      name: "Monster Energy Ultra Zero",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    },
    {
      id: "2",
      name: "Red Bull Energy Drink",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    },
    {
      id: "3",
      name: "Rockstar Energy Drink",
      price: 2.79,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef12?w=400&h=400&fit=crop",
    },
    {
      id: "4",
      name: "Bang Energy Drink",
      price: 3.29,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    },
    {
      id: "5",
      name: "NOS Energy Drink",
      price: 2.89,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    },
    {
      id: "6",
      name: "5-Hour Energy Shot",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef12?w=400&h=400&fit=crop",
    },
    {
      id: "7",
      name: "Monster Energy Original",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    },
    {
      id: "8",
      name: "Red Bull Sugar Free",
      price: 3.29,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    }
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="mb-4 overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-sm md:text-base font-medium mb-2">
                  {product.name}
                </h3>
                
                <p className="text-primary font-medium mb-3">
                  ${product.price.toFixed(2)}
                </p>
                
                <Button 
                  className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white text-xs uppercase tracking-wider py-2"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-white border border-primary text-primary hover:bg-primary hover:text-white text-sm uppercase tracking-wider px-8 py-3"
            onClick={() => window.location.href = '/products'}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
