import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/store/chatStore';

interface ChatbotProps {
  cartTotal?: number;
}

const quickReplies = [
  'Tell me about shipping',
  'What are your returns?',
  'Track my order',
  'Product sizing',
  'View my cart',
];

export function Chatbot({ cartTotal = 0 }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingOrderNumber, setAwaitingOrderNumber] = useState(false);
  const [awaitingEmail, setAwaitingEmail] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, addMessage, getOrderById, addEmail } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    // Order tracking flow
    if (awaitingOrderNumber) {
      setAwaitingOrderNumber(false);
      const order = getOrderById(userMessage);
      if (order) {
        return `Found your order!\n\nOrder #${order.id}\nStatus: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}\nTotal: $${order.total.toFixed(2)}\n\n${order.status === 'shipped' ? 'Your order is on its way! You should receive it within 3-5 business days.' : order.status === 'delivered' ? 'Your order has been delivered. We hope you love your Joe McHugh art!' : 'We\'re preparing your order for shipment.'}`;
      }
      return `I couldn't find an order with that number. Please check your order confirmation email. Order numbers look like "JM-123456". Would you like to try again or speak to our support team?`;
    }

    // Email capture flow
    if (awaitingEmail) {
      setAwaitingEmail(false);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(userMessage)) {
        addEmail(userMessage);
        return `Thank you! We've added ${userMessage} to our newsletter. You'll be the first to know about new Joe McHugh designs and exclusive offers.\n\n[DEMO: This would sync to Google Sheets]`;
      }
      return `That doesn't look like a valid email address. Please try again with a valid email like name@example.com`;
    }

    // Regular responses
    if (lowerMsg.includes('shipping') || lowerMsg.includes('delivery')) {
      return 'We offer free shipping on orders over $75!\n\n• Standard shipping (5-7 days): $5\n• Express shipping (2-3 days): $12\n\nAll orders are printed on demand and ship from our facility in California. You\'ll receive a tracking number once your order ships.';
    }

    if (lowerMsg.includes('return') || lowerMsg.includes('refund')) {
      return 'We accept returns within 30 days of delivery.\n\n• Items must be unworn and in original condition\n• Return shipping is the customer\'s responsibility\n• Refunds are processed within 5-7 business days\n\nTo start a return, just reply with "start return" and I\'ll help you out!';
    }

    if (lowerMsg.includes('track') || lowerMsg.includes('order') || lowerMsg.includes('where')) {
      setAwaitingOrderNumber(true);
      return 'I can help you track your order! Please provide your order number (it looks like JM-123456). You can find it in your order confirmation email.';
    }

    if (lowerMsg.includes('size') || lowerMsg.includes('fit') || lowerMsg.includes('sizing')) {
      return 'Our t-shirts are unisex and run true to size.\n\nSize Guide:\n• S: Chest 34-36"\n• M: Chest 38-40"\n• L: Chest 42-44"\n• XL: Chest 46-48"\n• 2XL: Chest 50-52"\n\nThe shirts are 100% combed cotton with a regular fit. When in doubt, size up for a more relaxed fit!';
    }

    if (lowerMsg.includes('cart') || lowerMsg.includes('checkout') || lowerMsg.includes('buy')) {
      if (cartTotal > 0) {
        return `I see you have $${cartTotal.toFixed(2)} in your cart! Ready to checkout? Click the cart icon in the top right to complete your purchase. Need help with anything else?`;
      }
      return 'Your cart is empty! Browse our collection of Joe McHugh psychedelic art t-shirts and add some to your cart. Is there a specific design you\'re looking for?';
    }

    if (lowerMsg.includes('joe') || lowerMsg.includes('artist') || lowerMsg.includes('who')) {
      return 'Joe McHugh (1939-2022) was a visionary artist and pioneer of the psychedelic art movement. His work emerged from the 1960s counterculture, combining mystical symbolism with playful line drawings. Each t-shirt features his original artwork, printed on high-quality cotton for a piece of wearable art history.';
    }

    if (lowerMsg.includes('email') || lowerMsg.includes('newsletter') || lowerMsg.includes('subscribe')) {
      setAwaitingEmail(true);
      return 'I\'d be happy to add you to our newsletter! Please share your email address and you\'ll be the first to know about new designs and exclusive offers.';
    }

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return 'Hello! Welcome to Joe McHugh Collection. I can help you with:\n\n• Product information\n• Shipping & delivery\n• Order tracking\n• Returns & exchanges\n• Sizing questions\n\nWhat can I assist you with today?';
    }

    return 'Thank you for reaching out! I can help with questions about our psychedelic art t-shirts, shipping, returns, order tracking, and sizing. What would you like to know? Or try one of the quick reply buttons below!';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputValue);
      addMessage(response, 'assistant');
      setIsTyping(false);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(reply);
      addMessage(response, 'assistant');
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-50 animate-pulse-slow"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[500px] bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-4 fade-in duration-300 border border-purple-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Joe McHugh Support</h3>
                <p className="text-xs text-white/70">AI Assistant • Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {!isTyping && messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 text-xs bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 rounded-full transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <Input
                placeholder={awaitingOrderNumber ? "Enter order number (JM-123456)..." : awaitingEmail ? "Enter your email..." : "Type your message..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 rounded-full border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
              />
              <Button 
                onClick={handleSend}
                size="icon"
                className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
