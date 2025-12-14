import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import soloRoomImg from '@/assets/solo-room.png';
import deluxeRoomImg from '@/assets/deluxe-room.png';
import twinRoomImg from '@/assets/twin-room.png';
import penthouseImg from '@/assets/penthouse.png';

const rooms = [
  {
    id: 'solo',
    titleKey: 'room.solo',
    price: 150,
    image: soloRoomImg,
    size: '25 sqm',
    guests: '1-2',
    bed: 'Single Bed',
    description: 'The Solo Room offers a warm and modern space designed for comfort. Inside, you\'ll find a cozy single bed with soft linens, a flat-screen TV, a work desk, and a private bathroom with hot shower.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Work Desk', 'Private Bathroom', 'Hot Shower', 'Daily Housekeeping'],
  },
  {
    id: 'deluxe',
    titleKey: 'room.deluxe',
    price: 280,
    image: deluxeRoomImg,
    size: '40 sqm',
    guests: '2-3',
    bed: 'Queen-size Bed',
    description: 'Designed for couples or small families, the Deluxe Room showcases a comfortable queen-size bed, elegant lighting, and contemporary décor. Guests can enjoy a lounging area, flat-screen TV, mini-bar, and premium amenities.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Lounging Area', 'Premium Toiletries', 'Room Service', 'City View'],
  },
  {
    id: 'twin',
    titleKey: 'room.twin',
    price: 350,
    image: twinRoomImg,
    size: '55 sqm',
    guests: '4',
    bed: 'Two Queen-size Beds',
    description: 'The Twin Deluxe Room features two queen-size beds, ideal for families or friends traveling together. The room offers a spacious layout with modern interiors, flat-screen TV, air conditioning, a mini-bar, and more.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Bathtub', 'Separate Living Area', 'Premium Toiletries', 'City View'],
  },
  {
    id: 'penthouse',
    titleKey: 'room.penthouse',
    price: 800,
    image: penthouseImg,
    size: '120 sqm',
    guests: '4-6',
    bed: 'King-size Bed',
    description: 'The Penthouse Suite is Elysium Hotel\'s most luxurious accommodation. It features a spacious living and dining area, a king-size bed, a private balcony with panoramic city views, and the largest bathroom with jacuzzi.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Full Mini Bar', 'Jacuzzi', 'Private Balcony', 'Butler Service', 'Panoramic Views', 'Living & Dining Area', 'Premium Sound System'],
  },
];

export default function Accommodations() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t('rooms.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the epitome of luxury in our carefully designed rooms and suites
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                id={room.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center scroll-mt-24`}
              >
                <div className="lg:w-1/2">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl shadow-elegant">
                    <img
                      src={room.image}
                      alt={t(room.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl mb-2">{t(room.titleKey)}</h2>
                    <p className="text-accent font-display text-2xl">
                      ${room.price} <span className="text-muted-foreground text-base font-body">/ night</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="px-3 py-1 bg-secondary rounded-full">{room.size}</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">{room.guests} Guests</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">{room.bed}</span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{room.description}</p>

                  <div>
                    <h4 className="font-medium mb-3">Room Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, i) => (
                        <span key={i} className="px-3 py-1 text-sm border border-border rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/booking?room=${room.id}`}
                    className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t('room.bookNow')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
