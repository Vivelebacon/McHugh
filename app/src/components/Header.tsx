import { useState } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useCart } from '@/store/cartStore';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface HeaderProps {
  navigate: (page: Page) => void;
  currentPage: Page;
}

export function Header({ navigate, currentPage }: HeaderProps) {
  const { isScrolled } = useScrollPosition();
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { page: Page; label: string }[] = [
    { page: 'shop', label: 'Shop' },
    { page: 'about', label: 'About' },
    { page: 'contact', label: 'Contact' },
  ];

  const isActive = (page: Page) => {
    if (page === 'shop') {
      return currentPage === 'shop' || currentPage === 'product';
    }
    return currentPage === page;
  };

  const handleNavClick = (page: Page) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="font-serif text-xl md:text-2xl tracking-tight text-[#1A1A1A] hover:text-purple-600 transition-colors duration-300 text-left"
          >
            Joe McHugh<br className="md:hidden" /> <span className="text-gradient">Collection</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.page) 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {link.label}
                {isActive(link.page) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2 text-gray-600">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white border-none">
                <div className="flex flex-col gap-8 mt-12">
                  {navLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`text-2xl font-serif text-left ${
                        isActive(link.page) 
                          ? 'text-purple-600' 
                          : 'text-gray-600'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
