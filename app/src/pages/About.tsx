import { AboutSection } from '@/sections/AboutSection';
import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface AboutProps {
  navigate?: (page: Page) => void;
}

export function About({ navigate }: AboutProps) {
  return (
    <main className="min-h-screen pt-24">
      <AboutSection />
      <Footer navigate={navigate} />
    </main>
  );
}
