import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'flying-birds',
    name: 'Flying Birds',
    slug: 'flying-birds',
    price: 35.00,
    description: 'Three birds in eternal flight, connected by circles of cosmic energy. A meditation on freedom and connection.',
    images: {
      natural: '/images/products/image(7).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'bloom-creature',
    name: 'Bloom Creature',
    slug: 'bloom-creature',
    price: 35.00,
    description: 'A whimsical guardian emerging from its shell, reaching for a single flower. Growth meets wonder.',
    images: {
      natural: '/images/products/image(4).png',
      black: '/images/products/image(6).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural', 'Black'],
    category: 'collection'
  },
  {
    id: 'the-other-cat-blue',
    name: 'The Other Cat',
    slug: 'the-other-cat-blue',
    price: 35.00,
    description: 'An all-knowing cat living between a riddle and a dream. The blue-striped visionary from Joe\'s early notebook.',
    images: {
      natural: '/images/products/image(10).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'the-other-cat-spotted',
    name: 'The Other Cat - Spotted',
    slug: 'the-other-cat-spotted',
    price: 35.00,
    description: 'The spotted guardian of imagination. A playful creature that watches over creative souls.',
    images: {
      white: '/images/products/image(1).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'collection'
  },
  {
    id: 'infinite-eyes',
    name: 'Infinite Eyes',
    slug: 'infinite-eyes',
    price: 35.00,
    description: 'Eyes that see with love, circling forever in overlapping spheres of perception.',
    images: {
      natural: '/images/products/image(5).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'messenger-bird',
    name: 'Messenger Bird',
    slug: 'messenger-bird',
    price: 35.00,
    description: 'A cosmic messenger speaking in symbols, transmitting wisdom from beyond the ordinary.',
    images: {
      natural: '/images/products/image(2).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'bird-of-prey',
    name: 'Bird of Prey',
    slug: 'bird-of-prey',
    price: 35.00,
    description: 'A bird perched between worlds, carrying the weight of perception and the lightness of flight.',
    images: {
      natural: '/images/products/image(9).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'cosmic-star',
    name: 'Cosmic Star',
    slug: 'cosmic-star',
    price: 35.00,
    description: 'A simple star radiating cosmic energy. Minimal line work, maximum impact.',
    images: {
      natural: '/images/products/image.png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'abstract-mind',
    name: 'Abstract Mind',
    slug: 'abstract-mind',
    price: 35.00,
    description: 'Fragments of thought, scattered across the canvas of consciousness. Joe\'s exploration of the inner landscape.',
    images: {
      natural: '/images/products/image(3).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  },
  {
    id: 'cosmic-forms',
    name: 'Cosmic Forms',
    slug: 'cosmic-forms',
    price: 35.00,
    description: 'Abstract shapes dancing in cosmic space. Forms that exist between the seen and the imagined.',
    images: {
      natural: '/images/products/image(8).png'
    },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural'],
    category: 'collection'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};
