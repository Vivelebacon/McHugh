import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Check, Truck, Shield } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface CheckoutProps {
  navigate: (page: Page) => void;
}

export function Checkout({ navigate }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingData, setShippingData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const newOrderId = `JM-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setIsComplete(true);
    clearCart();
  };

  if (items.length === 0 && !isComplete) {
    return (
      <main className="min-h-screen pt-32">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-[#1A1A1A] mb-4">Your cart is empty</h1>
          <p className="text-[#666666] mb-8">Add some Joe McHugh art to your cart before checking out.</p>
          <Button 
            onClick={() => navigate('shop')}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-8"
          >
            Browse Collection
          </Button>
        </div>
        <Footer navigate={navigate} />
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="min-h-screen pt-32">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-4xl text-[#1A1A1A] mb-4">Order Confirmed!</h1>
          <p className="text-[#666666] mb-2">Thank you for supporting Joe McHugh's legacy.</p>
          <p className="text-lg font-medium text-purple-600 mb-8">Order #{orderId}</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
            <p className="text-sm text-[#666666] mb-4">
              We've sent a confirmation email to {shippingData.email}. You'll receive tracking information once your order ships.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#666666]">
              <Truck className="w-4 h-4" />
              <span>Estimated delivery: 5-7 business days</span>
            </div>
          </div>

          <Button 
            onClick={() => navigate('shop')}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-8"
          >
            Continue Shopping
          </Button>
        </div>
        <Footer navigate={navigate} />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <button 
          onClick={() => step === 'payment' ? setStep('shipping') : navigate('cart')}
          className="flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 'shipping' ? 'Back to Cart' : 'Back to Shipping'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-3">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-purple-600' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-purple-100' : 'bg-green-100'}`}>
                  {step === 'shipping' ? '1' : <Check className="w-4 h-4" />}
                </div>
                <span className="font-medium">Shipping</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200">
                <div className={`h-full transition-all duration-500 ${step === 'payment' ? 'bg-green-500 w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            {step === 'shipping' ? (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Shipping Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={shippingData.email}
                    onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                    className="rounded-xl border-gray-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={shippingData.firstName}
                      onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                      className="rounded-xl border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                      className="rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={shippingData.address}
                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                    className="rounded-xl border-gray-200"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                      className="rounded-xl border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      required
                      value={shippingData.zip}
                      onChange={(e) => setShippingData({...shippingData, zip: e.target.value})}
                      className="rounded-xl border-gray-200"
                      placeholder="12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={shippingData.country}
                      disabled
                      className="rounded-xl border-gray-200 bg-gray-50"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl py-6"
                >
                  Continue to Payment
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Secure Payment</span>
                </div>

                <h2 className="font-serif text-2xl text-[#1A1A1A]">Payment Details</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    required
                    value={paymentData.name}
                    onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                    className="rounded-xl border-gray-200"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      required
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      className="rounded-xl border-gray-200 pl-10"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">[DEMO] Use any test card number</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      required
                      value={paymentData.expiry}
                      onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                      className="rounded-xl border-gray-200"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      required
                      value={paymentData.cvc}
                      onChange={(e) => setPaymentData({...paymentData, cvc: e.target.value})}
                      className="rounded-xl border-gray-200"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">
                    Your payment is secured with 256-bit SSL encryption. [DEMO MODE]
                  </p>
                </div>

                <Button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl py-6"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay $${(totalPrice + 5).toFixed(2)}`
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#1A1A1A]">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.color} / {item.size} / Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${(totalPrice + 5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </main>
  );
}
