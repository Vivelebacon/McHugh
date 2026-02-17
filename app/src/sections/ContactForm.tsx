import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Demo: Would send email and sync to Google Sheets
    console.log(`[DEMO] Contact form submission:`);
    console.log(`[DEMO] Would sync to Google Sheets:`, {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'contact_form'
    });
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            We're here for you. Reach out with questions or comments.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-12">
          <figure className="max-w-[280px]">
            <img
              src="/images/humble-sincere-flower.png"
              alt="Humble, Sincere Flower — drawing by Joe McHugh from Flapping Your Arms Can Be Flying"
              className="w-full rounded-xl shadow-md bg-black/5"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
              Humble, Sincere Flower — A single bloom stands before the great unknown. Drawing by Joe McHugh found in <em>Flapping Your Arms Can Be Flying</em>.
            </figcaption>
          </figure>
          <a 
            href="mailto:info@joemchughshop.com"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-4 py-2 rounded-full"
          >
            <Mail className="w-4 h-4" />
            info@joemchughshop.com
          </a>
        </div>

        {isSubmitted ? (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-4">We'll get back to you as soon as possible.</p>
            <p className="text-xs text-gray-400">[DEMO: Would sync to Google Sheets and send email]</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-[#1A1A1A]">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-[#1A1A1A]">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-[#1A1A1A]">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="How can we help?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-[#1A1A1A]">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl py-6 text-lg font-medium hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
