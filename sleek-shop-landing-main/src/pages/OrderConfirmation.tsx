import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderData = location.state as {
    customerInfo: any;
    orderTotal: number;
    orderNumber: string;
  } | null;

  if (!orderData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <Button onClick={() => navigate('/')} className="btn-primary">
            Return Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const { customerInfo, orderTotal, orderNumber } = orderData;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-muted-foreground">
              Your order has been successfully placed and is being processed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-semibold">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Total</p>
                  <p className="font-semibold text-primary">${orderTotal.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Shipping Information</h3>
                <div className="text-sm space-y-1">
                  <p>{customerInfo.fullName}</p>
                  <p>{customerInfo.address1}</p>
                  {customerInfo.address2 && <p>{customerInfo.address2}</p>}
                  <p>{customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                  <p>{customerInfo.country}</p>
                  <p className="pt-2 text-muted-foreground">Email: {customerInfo.email}</p>
                  {customerInfo.phone && (
                    <p className="text-muted-foreground">Phone: {customerInfo.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <p>You'll receive an order confirmation email shortly at {customerInfo.email}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <p>We'll send you tracking information once your order ships</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <p>Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/products')} 
              className="btn-primary"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;