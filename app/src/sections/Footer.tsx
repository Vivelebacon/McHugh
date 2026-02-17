import { useState } from 'react';
import { Instagram, Facebook, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface FooterProps {
  navigate?: (page: Page) => void;
}

export function Footer({ navigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Demo: Would sync to Google Sheets
      console.log(`[DEMO] Newsletter signup: ${email}`);
      console.log(`[DEMO] Would sync to Google Sheets: { email: "${email}", source: "newsletter", timestamp: "${new Date().toISOString()}" }`);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const handleNavClick = (page: Page) => {
    if (navigate) navigate(page);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400" />
      
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Explore */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wide text-gray-400">Explore</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  About Joe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('shop')}
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  Shop Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wide text-gray-400">Follow the journey</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/joe_mchugh_art/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61584140420989"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wide text-gray-400">Join the newsletter</h3>
            {isSubscribed ? (
              <div className="bg-purple-900/30 rounded-xl p-4">
                <p className="text-purple-300 text-sm">Thank you for subscribing! You'll be the first to know about new designs.</p>
                <p className="text-xs text-gray-500 mt-2">[DEMO: Email would sync to Google Sheets]</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
                <Button 
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Joe McHugh Collection. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Psychedelic art from the 1960s, reimagined for today.
          </p>
        </div>
      </div>
    </footer>
  );
}
