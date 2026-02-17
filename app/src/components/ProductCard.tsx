import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick: () => void;
}

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  // Get the first available image
  const imageUrl = product.images.natural || product.images.black || product.images.white || '';
  
  // Show color indicator if multiple colors available
  const hasMultipleColors = product.colors.length > 1;

  return (
    <button
      onClick={onClick}
      className="group block text-left w-full product-card-hover"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Color variants indicator */}
        {hasMultipleColors && (
          <div className="absolute top-3 right-3 flex gap-1">
            {product.colors.map((color) => (
              <div
                key={color}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                  color === 'Black' ? 'bg-black' : color === 'White' ? 'bg-white' : 'bg-[#F5F0E8]'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
          <span className="bg-white text-purple-600 px-6 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Quick View
          </span>
        </div>
      </div>
      
      <div className="space-y-1 px-1">
        <h3 className="font-medium text-[#1A1A1A] group-hover:text-purple-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-purple-600 font-medium">
          ${product.price.toFixed(2)}
        </p>
        {hasMultipleColors && (
          <p className="text-xs text-gray-400">
            {product.colors.length} colors available
          </p>
        )}
      </div>
    </button>
  );
}
