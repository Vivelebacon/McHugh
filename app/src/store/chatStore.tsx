import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ChatMessage, Order } from '@/types';

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  clearMessages: () => void;
  orders: Order[];
  createOrder: (email: string) => string;
  getOrderById: (orderId: string) => Order | undefined;
  capturedEmails: string[];
  addEmail: (email: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: 'JM-2024-001',
    items: [],
    total: 70.00,
    status: 'shipped',
    createdAt: new Date('2024-01-15'),
    email: 'demo@example.com'
  },
  {
    id: 'JM-2024-002',
    items: [],
    total: 35.00,
    status: 'delivered',
    createdAt: new Date('2024-01-10'),
    email: 'test@example.com'
  }
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Joe McHugh Collection! I\'m here to help with questions about our psychedelic art t-shirts, shipping, returns, or order tracking. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [capturedEmails, setCapturedEmails] = useState<string[]>([]);

  const addMessage = useCallback((content: string, role: 'user' | 'assistant') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Joe McHugh Collection! I\'m here to help with questions about our psychedelic art t-shirts, shipping, returns, or order tracking. How can I assist you today?',
      timestamp: new Date()
    }]);
  }, []);

  const createOrder = useCallback((email: string) => {
    const orderId = `JM-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      items: [],
      total: 0,
      status: 'pending',
      createdAt: new Date(),
      email
    };
    setOrders(prev => [...prev, newOrder]);
    return orderId;
  }, []);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  }, [orders]);

  const addEmail = useCallback((email: string) => {
    setCapturedEmails(prev => {
      if (!prev.includes(email)) {
        // In production, this would sync to Google Sheets
        console.log(`[DEMO] Email captured for newsletter: ${email}`);
        console.log(`[DEMO] Would sync to Google Sheets: { email: "${email}", timestamp: "${new Date().toISOString()}" }`);
        return [...prev, email];
      }
      return prev;
    });
  }, []);

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      clearMessages,
      orders,
      createOrder,
      getOrderById,
      capturedEmails,
      addEmail
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
