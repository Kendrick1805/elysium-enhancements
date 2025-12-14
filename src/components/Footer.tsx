import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      {/* About Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-2xl font-semibold mb-4">ELYSIUM</h3>
              <p className="text-background/70 leading-relaxed max-w-md">
                Elysium Hotel offers an unparalleled luxury experience where every detail is crafted to perfection. 
                Nestled in the heart of paradise, we provide a sanctuary of elegance, comfort, and world-class service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-medium mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/accommodations" className="text-background/70 hover:text-accent transition-colors">
                  {t('nav.accommodations')}
                </Link>
                <Link to="/amenities" className="text-background/70 hover:text-accent transition-colors">
                  {t('nav.amenities')}
                </Link>
                <Link to="/services" className="text-background/70 hover:text-accent transition-colors">
                  {t('nav.services')}
                </Link>
                <Link to="/booking" className="text-background/70 hover:text-accent transition-colors">
                  {t('nav.booking')}
                </Link>
                <Link to="/careers" className="text-background/70 hover:text-accent transition-colors">
                  {t('nav.careers')}
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-medium mb-4">Contact</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:+1234567890" className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
                <a href="mailto:info@elysium.com" className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@elysium.com</span>
                </a>
                <div className="flex items-start gap-3 text-background/70">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <span>Quirino Highway, Novaliches, Quezon City, 12345</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="p-2 rounded-full border border-background/20 hover:border-accent hover:text-accent transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full border border-background/20 hover:border-accent hover:text-accent transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full border border-background/20 hover:border-accent hover:text-accent transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-background/50 text-sm">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
