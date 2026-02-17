import { ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface CartProps {
  navigate: (page: Page) => void;
}

export function Cart({ navigate }: CartProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <main className="min-h-screen pt-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-purple-600" />
            </div>
            <p className="text-[#666666] mb-8 text-lg">Your cart is empty</p>
            <Button 
              onClick={() => navigate('shop')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-8"
            >
              Browse Collection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div 
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-[#1A1A1A]">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
                    <p className="text-purple-600 font-medium mt-1">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <button 
                  onClick={() => navigate('shop')}
                  className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-24">
              <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-400">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-lg">Total</span>
                  <span className="font-medium text-lg">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('checkout')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl py-6 text-lg font-medium"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer navigate={navigate} />
    </main>
  );
}
