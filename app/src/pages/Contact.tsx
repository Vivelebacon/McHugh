import { ContactForm } from '@/sections/ContactForm';
import { Footer } from '@/sections/Footer';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface ContactProps {
  navigate?: (page: Page) => void;
}

export function Contact({ navigate }: ContactProps) {
  return (
    <main className="min-h-screen pt-24">
      <ContactForm />
      <Footer navigate={navigate} />
    </main>
  );
}
