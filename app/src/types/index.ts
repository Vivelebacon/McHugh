export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: {
    natural?: string;
    black?: string;
    white?: string;
  };
  sizes: string[];
  colors: string[];
  category: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  email: string;
}
