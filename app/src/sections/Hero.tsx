type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';

interface HeroProps {
  navigate: (page: Page) => void;
}

export function Hero({ navigate }: HeroProps) {
  return (
    <section className="min-h-screen relative overflow-hidden bg-[#FAF8F5]">
      {/* Psychedelic background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-purple w-[600px] h-[600px] -top-40 -left-40 animate-morph" />
        <div className="blob blob-pink w-[500px] h-[500px] top-1/3 -right-40 animate-morph" style={{ animationDelay: '-2s' }} />
        <div className="blob blob-orange w-[400px] h-[400px] bottom-20 left-1/4 animate-morph" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col items-center justify-center py-20">
        {/* Hero Illustration */}
        <div className="relative mb-12">
          {/* Glowing ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-purple-200/50 animate-pulse-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-pink-200/30 animate-pulse-slow" style={{ animationDelay: '-1s' }} />
          </div>
          
          {/* Main image */}
          <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] animate-float">
            <img
              src="/images/products/image(7).png"
              alt="Joe McHugh Artwork - Flying Birds"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Tagline */}
        <div className="text-center">
          <p className="font-serif text-4xl md:text-6xl text-[#1A1A1A] italic mb-4">
            Stay curious…
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Wearable art from the psychedelic pioneer Joe McHugh
          </p>
          <button 
            onClick={() => navigate('shop')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium text-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
          >
            <span className="relative z-10">Explore Collection</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
