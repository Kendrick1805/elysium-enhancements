import React, { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function Careers() {
  const [formData, setFormData] = useState({ name: '', email: '', position: '', message: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const positions = ['Front Desk Agent', 'Housekeeping Staff', 'Restaurant Server', 'Spa Therapist', 'Concierge', 'Event Coordinator'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Thank you for applying to Elysium!');
    setFormData({ name: '', email: '', position: '', message: '' });
    setResume(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-20 bg-secondary">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl mb-4">Join Our Team</h1>
          <p className="text-muted-foreground">Be part of the Elysium experience</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-elegant p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-input rounded-lg bg-background" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-input rounded-lg bg-background" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <select value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-3 border border-input rounded-lg bg-background" required>
              <option value="">Select a position</option>
              {positions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Resume</label>
            <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-accent transition-colors">
              <Upload className="w-5 h-5" />
              <span>{resume ? resume.name : 'Upload your resume'}</span>
              <input type="file" className="sr-only" onChange={e => setResume(e.target.files?.[0] || null)} accept=".pdf,.doc,.docx" />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cover Letter</label>
            <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-4 py-3 border border-input rounded-lg bg-background resize-none" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
