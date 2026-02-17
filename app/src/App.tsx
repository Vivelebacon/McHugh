import { useState } from 'react';
import { CartProvider } from '@/store/cartStore';
import { ChatProvider } from '@/store/chatStore';
import { Header } from '@/components/Header';
import { CartSidebar } from '@/components/CartSidebar';
import { Chatbot } from '@/components/Chatbot';
import { Home } from '@/pages/Home';
import { Shop } from '@/pages/Shop';
import { ProductDetail } from '@/pages/ProductDetail';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productSlug, setProductSlug] = useState<string>('');

  const navigate = (page: Page, slug?: string) => {
    setCurrentPage(page);
    if (slug) setProductSlug(slug);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'shop':
        return <Shop navigate={navigate} />;
      case 'product':
        return <ProductDetail slug={productSlug} navigate={navigate} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'contact':
        return <Contact navigate={navigate} />;
      case 'cart':
        return <Cart navigate={navigate} />;
      case 'checkout':
        return <Checkout navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <ChatProvider>
        <div className="min-h-screen bg-[#FAF8F5]">
          <Header navigate={navigate} currentPage={currentPage} />
          <CartSidebar navigate={navigate} />
          <Chatbot />
          {renderPage()}
        </div>
      </ChatProvider>
    </CartProvider>
  );
}

export default App;
