# Joe McHugh Collection - Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, form submits | Remove border-radius, custom colors |
| Input | Form fields | Remove border-radius, custom border color |
| Textarea | Contact form message | Match input styling |
| Select | Size/color selectors | Custom styling |
| Sheet | Mobile nav, cart sidebar | Slide from right |
| Dialog | Quick view modal | Minimal styling |
| Badge | Cart count | Small, minimal |
| Separator | Section dividers | Custom color |
| ScrollArea | Chat window | Custom scrollbar |

### Third-Party Registry Components
None required - all components can be built with shadcn/ui + custom code.

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| Header | Navigation with scroll effect | `components/Header.tsx` |
| Hero | Homepage hero section | `sections/Hero.tsx` |
| ProductCard | Product grid item | `components/ProductCard.tsx` |
| ProductGrid | Shop page grid | `sections/ProductGrid.tsx` |
| ProductDetail | Single product view | `pages/ProductDetail.tsx` |
| CartSidebar | Shopping cart | `components/CartSidebar.tsx` |
| CartItem | Individual cart item | `components/CartItem.tsx` |
| Chatbot | AI chat widget | `components/Chatbot.tsx` |
| Footer | Site footer | `sections/Footer.tsx` |
| AboutSection | About page content | `sections/AboutSection.tsx` |
| ContactForm | Contact page form | `sections/ContactForm.tsx` |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load fade | Framer Motion | AnimatePresence on page wrapper | Low |
| Scroll reveal | Framer Motion | useInView + motion.div | Medium |
| Nav background transition | CSS + React | useScroll hook, conditional class | Low |
| Product card hover | CSS | transform: scale, transition | Low |
| Product grid stagger | Framer Motion | staggerChildren in variants | Medium |
| Hero illustration float | CSS | @keyframes animation | Low |
| Button hover lift | CSS | transform: translateY | Low |
| Link underline | CSS | ::after pseudo-element width | Low |
| Mobile menu slide | Framer Motion | AnimatePresence + motion.div | Medium |
| Cart sidebar slide | shadcn Sheet | Built-in animation | Low |
| Chatbot open/close | Framer Motion | AnimatePresence + scale/opacity | Medium |
| Chat message appear | Framer Motion | staggerChildren for messages | Medium |
| Image zoom on hover | CSS | transform: scale on container | Low |

## Animation Library Choices

### Primary: Framer Motion
- React-native integration
- AnimatePresence for mount/unmount
- useInView for scroll triggers
- Variants for complex sequences
- Gesture support

### Secondary: CSS Animations
- Simple hover effects
- Keyframe animations (floating)
- Transitions for color/opacity
- Better performance for simple effects

## Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   └── images/
│       ├── hero-birds.jpg
│       ├── cosmic-parrot-black.jpg
│       ├── cosmic-parrot-pink.jpg
│       ├── cosmic-parrot-white.jpg
│       ├── cleaver-dragon-black.jpg
│       ├── cleaver-dragon-pink.jpg
│       ├── cleaver-dragon-white.jpg
│       ├── crouching-cat-black.jpg
│       ├── crouching-cat-pink.jpg
│       ├── crouching-cat-white.jpg
│       ├── bloom-looking-back-black.jpg
│       ├── bloom-looking-back-pink.jpg
│       ├── bloom-looking-back-white.jpg
│       ├── badass-bird-black.jpg
│       ├── badass-bird-pink.jpg
│       ├── badass-bird-white.jpg
│       ├── infinite-kind-eyes-black.jpg
│       ├── infinite-kind-eyes-pink.jpg
│       ├── infinite-kind-eyes-white.jpg
│       ├── heros-journey-black.jpg
│       ├── heros-journey-pink.jpg
│       ├── moon-bird-flower-white.jpg
│       ├── the-other-cat-black.jpg
│       ├── the-other-cat-white.jpg
│       └── unisex-classic-tee.jpg
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartSidebar.tsx
│   │   ├── CartItem.tsx
│   │   └── Chatbot.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Cart.tsx
│   ├── hooks/
│   │   ├── useCart.tsx
│   │   ├── useScrollPosition.tsx
│   │   └── useChatbot.tsx
│   ├── store/
│   │   └── cartStore.ts
│   ├── data/
│   │   └── products.ts
│   ├── types/
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Dependencies

### Core
- react
- react-dom
- react-router-dom
- typescript

### UI
- @radix-ui/* (via shadcn)
- tailwindcss
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react

### Animation
- framer-motion

### State Management
- zustand (cart state)

### Forms
- react-hook-form (optional)
- zod (validation)

## Installation Commands

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Joe McHugh Collection"

# Install shadcn components
npx shadcn add button input textarea select sheet dialog badge separator scroll-area

# Install animation library
npm install framer-motion

# Install state management
npm install zustand

# Install icons
npm install lucide-react
```

## Data Structure

### Product Type
```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: {
    black?: string;
    pink?: string;
    white?: string;
    natural?: string;
  };
  sizes: string[];
  colors: string[];
  category: string;
}
```

### Cart Item Type
```typescript
interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}
```

## Key Implementation Notes

1. **Cart State**: Use Zustand for global cart state with localStorage persistence
2. **Routing**: React Router with routes: /, /shop, /shop/p/:slug, /about, /contact, /cart
3. **Scroll Effects**: Custom hook useScrollPosition for nav background transition
4. **Chatbot**: Simple state-based chat with predefined responses
5. **Responsive**: Mobile-first approach with Tailwind breakpoints
6. **Images**: All product images pre-generated and stored in public/images/
7. **Stripe**: Integration ready but can use mock checkout for demo
