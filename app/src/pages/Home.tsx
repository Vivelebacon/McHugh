import { Hero } from '@/sections/Hero';
import { ProductGrid } from '@/sections/ProductGrid';
import { AboutSection } from '@/sections/AboutSection';
import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface HomeProps {
  navigate: (page: Page, slug?: string) => void;
}

export function Home({ navigate }: HomeProps) {
  return (
    <main className="min-h-screen">
      <Hero navigate={navigate} />
      <ProductGrid navigate={navigate} />
      <AboutSection />
      <Footer navigate={navigate} />
    </main>
  );
}
