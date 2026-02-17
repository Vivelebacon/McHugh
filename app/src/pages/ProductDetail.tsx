import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface ProductDetailProps {
  slug: string;
  navigate: (page: Page, slug?: string) => void;
}

export function ProductDetail({ slug, navigate }: ProductDetailProps) {
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen pt-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-3xl text-[#1A1A1A] mb-4">Product not found</h1>
          <button 
            onClick={() => navigate('shop')}
            className="text-purple-600 underline"
          >
            Back to shop
          </button>
        </div>
        <Footer navigate={navigate} />
      </main>
    );
  }

  // Get the appropriate image based on selected color or default
  const getImageUrl = () => {
    if (selectedColor === 'Black') {
      return product.images.black || product.images.natural || product.images.white || '';
    } else if (selectedColor === 'White') {
      return product.images.white || product.images.natural || product.images.black || '';
    }
    return product.images.natural || product.images.black || product.images.white || '';
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: getImageUrl(),
      size: selectedSize,
      color: selectedColor,
      quantity
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Color swatch component
  const ColorSwatch = ({ color }: { color: string }) => {
    const isSelected = selectedColor === color;
    const bgColor = color === 'Black' ? 'bg-black' : color === 'White' ? 'bg-white' : 'bg-[#F5F0E8]';
    const borderColor = color === 'White' ? 'border-gray-300' : 'border-transparent';
    
    return (
      <button
        onClick={() => setSelectedColor(color)}
        className={`w-12 h-12 rounded-full ${bgColor} ${borderColor} border-2 flex items-center justify-center transition-all ${
          isSelected ? 'ring-2 ring-purple-500 ring-offset-2 scale-110' : 'hover:scale-105'
        }`}
        title={color}
      >
        {isSelected && <Check className={`w-5 h-5 ${color === 'White' ? 'text-gray-800' : 'text-white'}`} />}
      </button>
    );
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#666666] mb-8">
          <button 
            onClick={() => navigate('shop')}
            className="hover:text-purple-600 transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden shadow-lg">
            <img
              src={getImageUrl()}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-2">
                {product.name}
              </h1>
              <p className="text-2xl text-purple-600 font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-[#666666] leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#1A1A1A]">
                Color: <span className="text-purple-600">{selectedColor || 'Select'}</span>
              </Label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <ColorSwatch key={color} color={color} />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#1A1A1A]">Size</Label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-50 text-purple-600'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#1A1A1A]">Quantity</Label>
              <div className="flex items-center border-2 border-gray-200 rounded-xl w-fit overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
                >
                  -
                </button>
                <span className="px-4 py-3 min-w-[3rem] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`w-full rounded-xl py-6 text-lg font-medium tracking-wide transition-all ${
                isAdded
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90'
              }`}
            >
              {isAdded ? (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </span>
              ) : (
                'Add to Cart'
              )}
            </Button>

            {/* Product Details */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-medium text-[#1A1A1A] mb-4">About This Design</h3>
              <p className="text-sm text-[#666666] leading-relaxed mb-4">
                Each Joe McHugh t-shirt is printed on demand using eco-friendly, water-based inks. 
                The artwork is faithfully reproduced from Joe's original 1960s sketchbooks.
              </p>
              <ul className="text-sm text-[#666666] space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  100% combed cotton
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Pre-shrunk, regular fit
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Water-based eco-friendly print
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Printed in California
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </main>
  );
}
