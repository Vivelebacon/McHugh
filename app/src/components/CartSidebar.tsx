import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface CartSidebarProps {
  navigate?: (page: Page) => void;
}

export function CartSidebar({ navigate }: CartSidebarProps) {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  const handleViewCart = () => {
    setIsOpen(false);
    if (navigate) navigate('cart');
  };

  const handleCheckout = () => {
    setIsOpen(false);
    if (navigate) navigate('checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:w-[420px] bg-white p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-xl">Shopping Cart ({items.length})</SheetTitle>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-purple-600" />
            </div>
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#1A1A1A] truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
                    <p className="text-purple-600 font-medium mt-1">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl py-5 font-medium"
              >
                Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleViewCart}
                className="w-full rounded-xl border-gray-200"
              >
                View Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
