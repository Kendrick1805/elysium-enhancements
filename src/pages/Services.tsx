import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import conciergeImg from '@/assets/concierge.png';
import roomServiceImg from '@/assets/room-service.png';
import spaImg from '@/assets/spa.png';
import businessImg from '@/assets/business.png';
import eventImg from '@/assets/event.png';
import airportImg from '@/assets/airport.png';

const services = [
  {
    id: 'concierge',
    title: '24/7 Concierge',
    description: 'Round-the-clock assistance for all your needs',
    image: conciergeImg,
    details: 'Our dedicated concierge team is available around the clock to assist with any request. From restaurant reservations and tour bookings to special arrangements and local recommendations, we ensure every aspect of your stay is exceptional.',
    offerings: ['Restaurant Reservations', 'Tour Bookings', 'Transportation Arrangements', 'Event Tickets', 'Special Requests', 'Local Recommendations'],
  },
  {
    id: 'room-service',
    title: 'Room Service',
    description: 'Fine dining delivered to your room anytime',
    image: roomServiceImg,
    details: 'Enjoy our gourmet cuisine in the comfort of your room. Our 24-hour room service menu features a carefully curated selection of dishes prepared by our world-class chefs, delivered with impeccable presentation.',
    offerings: ['24-Hour Availability', 'Full Menu Selection', 'Wine & Beverages', 'Special Dietary Options', 'In-Room Setup', 'Breakfast in Bed'],
  },
  {
    id: 'spa',
    title: 'Spa & Wellness',
    description: 'Rejuvenate with our premium spa treatments',
    image: spaImg,
    details: 'Escape to our tranquil spa sanctuary where expert therapists offer a range of rejuvenating treatments. From traditional massages to innovative wellness therapies, experience complete relaxation and renewal.',
    offerings: ['Massage Therapies', 'Facial Treatments', 'Body Wraps', 'Couples Treatments', 'Aromatherapy', 'Wellness Programs'],
  },
  {
    id: 'business',
    title: 'Business Center',
    description: 'Fully equipped facilities for business travelers',
    image: businessImg,
    details: 'Our modern business center provides everything you need to stay productive. With high-speed internet, private meeting rooms, and full secretarial services, conducting business away from the office has never been easier.',
    offerings: ['High-Speed Internet', 'Meeting Rooms', 'Video Conferencing', 'Printing Services', 'Secretarial Support', 'Private Offices'],
  },
  {
    id: 'event',
    title: 'Event Hosting',
    description: 'Perfect venues for conferences and celebrations',
    image: eventImg,
    details: 'From intimate gatherings to grand celebrations, our versatile event spaces can accommodate any occasion. Our experienced events team will work with you to create unforgettable moments with attention to every detail.',
    offerings: ['Wedding Venues', 'Conference Rooms', 'Banquet Halls', 'Outdoor Spaces', 'Catering Services', 'Event Planning'],
  },
  {
    id: 'airport',
    title: 'Airport Transfer',
    description: 'Convenient transportation to and from airport',
    image: airportImg,
    details: 'Start and end your journey in comfort with our premium airport transfer service. Our professional chauffeurs and luxury vehicles ensure a seamless and relaxing travel experience.',
    offerings: ['Luxury Vehicles', 'Meet & Greet', 'Flight Tracking', 'Professional Chauffeurs', 'Complimentary Water', 'WiFi On Board'],
  },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t('services.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience unparalleled service designed to exceed your every expectation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-elegant transition-shadow scroll-mt-24"
              >
                <div className="aspect-video">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h2 className="font-display text-2xl mb-2">{service.title}</h2>
                  <p className="font-accent text-accent italic mb-4">{service.description}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.details}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {service.offerings.map((offering, i) => (
                      <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {offering}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
