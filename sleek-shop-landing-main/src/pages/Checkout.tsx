import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PayPalPayment from '@/components/PayPalPayment';

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'address1', 'city', 'state', 'zipCode', 'country'];
    return required.every(field => customerInfo[field as keyof CustomerInfo].trim() !== '');
  };

  const handlePaymentSuccess = (details: any) => {
    setPaymentStatus('success');
    setPaymentDetails(details);
    toast({
      title: "Payment Successful!",
      description: "Your PayPal payment was processed successfully.",
    });
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus('error');
    toast({
      title: "Payment Failed",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    if (state.items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }
    if (paymentStatus !== 'success') {
      toast({
        title: "Payment Required",
        description: "Please complete your PayPal payment before placing the order.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: `Thank you ${customerInfo.fullName}! Your order total was $${state.total.toFixed(2)}`,
    });
    navigate('/order-confirmation', { 
      state: { 
        customerInfo, 
        orderTotal: state.total,
        orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentDetails
      } 
    });
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to proceed with checkout</p>
          <Button onClick={() => navigate('/products')} className="btn-primary">
            Browse Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <nav className="text-sm text-muted-foreground">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Checkout</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={customerInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address1">Address Line 1 *</Label>
                    <Input
                      id="address1"
                      value={customerInfo.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                      id="address2"
                      value={customerInfo.address2}
                      onChange={(e) => handleInputChange('address2', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={customerInfo.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={customerInfo.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* PayPal Payment Section */}
                  {validateForm() && (
                    <div className="mt-6">
                      <Label className="text-base font-medium">Payment Method</Label>
                      <div className="mt-2">
                        <PayPalPayment
                          amount={state.total}
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                          disabled={!validateForm()}
                        />
                      </div>
                      {paymentStatus === 'success' && (
                        <div className="mt-2 text-green-600 text-sm">
                          ✓ Payment completed successfully
                        </div>
                      )}
                      {paymentStatus === 'error' && (
                        <div className="mt-2 text-red-600 text-sm">
                          ✗ Payment failed. Please try again.
                        </div>
                      )}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full btn-accent mt-6"
                    disabled={isSubmitting || paymentStatus !== 'success'}
                  >
                    {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(state.total)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-primary font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal:</span>
                      <span>{formatPrice(state.total)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Tax:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-4">
                      <span>Total:</span>
                      <span className="text-primary">{formatPrice(state.total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;