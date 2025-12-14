import React, { useState } from 'react';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Message sent successfully!');
    setFormData({ name: '', subject: '', message: '' });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl mb-4">Contact Us</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card rounded-xl shadow-elegant p-8">
            <h2 className="font-display text-2xl mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-input rounded-lg bg-background" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 border border-input rounded-lg bg-background" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 border border-input rounded-lg bg-background resize-none" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-6">
              <div className="flex items-center gap-4"><Phone className="w-6 h-6 text-accent" /><div><p className="font-medium">Phone</p><p className="text-muted-foreground">+1 (234) 567-890</p></div></div>
            </div>
            <div className="bg-card rounded-xl p-6">
              <div className="flex items-center gap-4"><Mail className="w-6 h-6 text-accent" /><div><p className="font-medium">Email</p><p className="text-muted-foreground">johnkendrickreyes69@gmail.com</p></div></div>
            </div>
            <div className="bg-card rounded-xl p-6">
              <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-accent" /><div><p className="font-medium">Address</p><p className="text-muted-foreground">Quirino Highway, Novaliches, Quezon City, 12345</p></div></div>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5!2d121.0!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sph!4v1" width="100%" height="100%" style={{border:0}} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
