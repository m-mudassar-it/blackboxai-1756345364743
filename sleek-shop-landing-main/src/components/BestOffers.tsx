import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const BestOffers = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const offers = [
    {
      id: "offer-1",
      name: "Monster Energy 12-Pack",
      description: "Bulk pack of Monster Energy drinks with great savings",
      originalPrice: 35.99,
      discountedPrice: 24.99,
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    },
    {
      id: "offer-2",
      name: "Red Bull 24-Pack Bundle",
      description: "24 cans of Red Bull energy drinks at discounted price",
      originalPrice: 83.99,
      discountedPrice: 59.99,
      discount: "29% OFF",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    },
    {
      id: "offer-3",
      name: "Energy Drink Variety Pack",
      description: "Mix of different energy drinks for variety",
      originalPrice: 49.99,
      discountedPrice: 34.99,
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef12?w=400&h=400&fit=crop",
    },
    {
      id: "offer-4",
      name: "5-Hour Energy 10-Pack",
      description: "10 energy shots for maximum convenience",
      originalPrice: 49.99,
      discountedPrice: 39.99,
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    },
  ];

  const handleAddToCart = (offer: typeof offers[0]) => {
    addItem({
      id: offer.id,
      name: offer.name,
      price: offer.discountedPrice,
      image: offer.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${offer.name} has been added to your cart at the discounted price!`,
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Best Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Limited time deals on our most popular products. Don't miss out on these amazing savings!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="card-hover border-0 shadow-soft relative overflow-hidden">
              <Badge className="absolute top-4 right-4 z-10 bg-success text-success-foreground">
                {offer.discount}
              </Badge>
              
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {offer.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {offer.description}
                  </p>
                  
                   <div className="mb-4">
                     <div className="flex items-center gap-2">
                       <span className="text-lg text-muted-foreground line-through">
                         ${offer.originalPrice}
                       </span>
                       <span className="text-2xl font-bold text-success">
                         ${offer.discountedPrice}
                       </span>
                     </div>
                   </div>
                   
                   <Button 
                     className="w-full btn-accent"
                     onClick={() => handleAddToCart(offer)}
                   >
                     Add to Cart
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestOffers;