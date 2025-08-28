import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PayPalPaymentProps {
  amount: number;
  onPaymentSuccess: (paymentDetails: any) => void;
  onPaymentError: (error: any) => void;
  disabled?: boolean;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalPayment = ({ amount, onPaymentSuccess, onPaymentError, disabled = false }: PayPalPaymentProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.paypal || disabled) return;

    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            onPaymentSuccess(order);
          } catch (error) {
            onPaymentError(error);
          }
        },
        onError: (err: any) => {
          onPaymentError(err);
        },
      })
      .render(paypalRef.current);

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
    };
  }, [amount, onPaymentSuccess, onPaymentError, disabled]);

  if (disabled) {
    return (
      <Button disabled className="w-full">
        PayPal Payment (Disabled)
      </Button>
    );
  }

  return (
    <div className="w-full">
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PayPalPayment; 