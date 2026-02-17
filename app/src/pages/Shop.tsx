import { ProductGrid } from '@/sections/ProductGrid';
import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface ShopProps {
  navigate: (page: Page, slug?: string) => void;
}

export function Shop({ navigate }: ShopProps) {
  return (
    <main className="min-h-screen pt-24">
      <ProductGrid navigate={navigate} />
      <Footer navigate={navigate} />
    </main>
  );
}
