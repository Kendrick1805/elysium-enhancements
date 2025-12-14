import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import infinityImg from '@/assets/infinity-pool.png';
import gymImg from '@/assets/fitness-center.png';
import diningImg from '@/assets/gourmet-dining.png';
import entertainmentImg from '@/assets/evening-entertainment.png';

const amenities = [
  {
    id: 'pool',
    titleKey: 'amenity.pool',
    descKey: 'amenity.pool.desc',
    image: infinityImg,
    details: 'Our stunning heated infinity pool offers a one-of-a-kind swimming experience with breathtaking panoramic views. Open from 6 AM to 10 PM daily, the pool area features comfortable loungers, poolside service, and a relaxing atmosphere perfect for unwinding.',
    features: ['Heated Year-Round', 'Panoramic Views', 'Poolside Bar', 'Sun Loungers', 'Towel Service', 'Private Cabanas'],
  },
  {
    id: 'gym',
    titleKey: 'amenity.gym',
    descKey: 'amenity.gym.desc',
    image: gymImg,
    details: 'Our state-of-the-art fitness center is equipped with the latest cardio machines, free weights, and strength training equipment. Personal trainers are available upon request, and the facility is open 24 hours for your convenience.',
    features: ['24/7 Access', 'Personal Trainers', 'Cardio Equipment', 'Free Weights', 'Yoga Studio', 'Locker Rooms'],
  },
  {
    id: 'dining',
    titleKey: 'amenity.dining',
    descKey: 'amenity.dining.desc',
    image: diningImg,
    details: 'Experience culinary excellence at our gourmet restaurant featuring Michelin-inspired cuisine crafted by world-class chefs. Our menu showcases the finest local and international ingredients, paired with an extensive wine selection.',
    features: ['World-Class Chefs', 'Local Ingredients', 'Wine Cellar', 'Private Dining', 'Room Service', 'Breakfast Buffet'],
  },
  {
    id: 'entertainment',
    titleKey: 'amenity.entertainment',
    descKey: 'amenity.entertainment.desc',
    image: entertainmentImg,
    details: 'Every evening at Elysium comes alive with curated entertainment experiences. From live music performances to themed nights, our entertainment program ensures memorable evenings for all guests.',
    features: ['Live Music', 'Themed Events', 'Cocktail Hours', 'Dance Floor', 'Guest Performers', 'Sunset Viewing'],
  },
];

export default function Amenities() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t('amenities.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover world-class facilities designed for your comfort and enjoyment
          </p>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {amenities.map((amenity, index) => (
              <div
                key={amenity.id}
                id={amenity.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center scroll-mt-24`}
              >
                <div className="lg:w-1/2">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-elegant">
                    <img
                      src={amenity.image}
                      alt={t(amenity.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl mb-3">{t(amenity.titleKey)}</h2>
                    <p className="font-accent text-lg text-accent italic">{t(amenity.descKey)}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{amenity.details}</p>

                  <div>
                    <h4 className="font-medium mb-3">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {amenity.features.map((feature, i) => (
                        <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {feature}
                        </span>
                      ))}
                    </div>
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
