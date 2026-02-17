import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface ProductGridProps {
  navigate: (page: Page, slug?: string) => void;
}

export function ProductGrid({ navigate }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">
            The Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Original artwork from Joe McHugh's 1960s sketchbooks, faithfully reproduced on premium cotton
          </p>
          
          {/* Filters */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Designs
            </button>
            <button
              onClick={() => setActiveFilter('collection')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'collection' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              T-Shirt Collection
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onClick={() => navigate('product', product.slug)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic mb-6">
            "It's your journey. We're honored to tag along."
          </p>
          <p className="text-gray-500 text-sm">— Joe McHugh</p>
        </div>
      </div>
    </section>
  );
}
