import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MessageCircle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import heroBg from '@/assets/hero-bg.jpg';
import infinityImg from '@/assets/infinity-pool.png';
import gymImg from '@/assets/fitness-center.png';
import diningImg from '@/assets/gourmet-dining.png';
import entertainmentImg from '@/assets/evening-entertainment.png';
import soloRoomImg from '@/assets/solo-room.png';
import deluxeRoomImg from '@/assets/deluxe-room.png';
import twinRoomImg from '@/assets/twin-room.png';
import penthouseImg from '@/assets/penthouse.png';
import conciergeImg from '@/assets/concierge.png';
import roomServiceImg from '@/assets/room-service.png';
import spaImg from '@/assets/spa.png';
import businessImg from '@/assets/business.png';
import eventImg from '@/assets/event.png';
import airportImg from '@/assets/airport.png';

const amenities = [
  { id: 'pool', image: infinityImg, titleKey: 'amenity.pool', descKey: 'amenity.pool.desc' },
  { id: 'gym', image: gymImg, titleKey: 'amenity.gym', descKey: 'amenity.gym.desc' },
  { id: 'dining', image: diningImg, titleKey: 'amenity.dining', descKey: 'amenity.dining.desc' },
  { id: 'entertainment', image: entertainmentImg, titleKey: 'amenity.entertainment', descKey: 'amenity.entertainment.desc' },
];

const rooms = [
  {
    id: 'solo',
    image: soloRoomImg,
    titleKey: 'room.solo',
    price: '$150',
    description: 'The Solo Room offers a warm and modern space designed for comfort. Inside, you\'ll find a cozy single bed with soft linens, a flat-screen TV, a work desk, and a private bathroom with hot shower.',
  },
  {
    id: 'deluxe',
    image: deluxeRoomImg,
    titleKey: 'room.deluxe',
    price: '$280',
    description: 'Designed for couples or small families, the Deluxe Room showcases a comfortable queen-size bed, elegant lighting, and contemporary décor. Guests can enjoy a lounging area, flat-screen TV, mini-bar, and premium amenities.',
  },
  {
    id: 'twin',
    image: twinRoomImg,
    titleKey: 'room.twin',
    price: '$350',
    description: 'The Twin Deluxe Room features two queen-size beds, ideal for families or friends traveling together. The room offers a spacious layout with modern interiors, flat-screen TV, air conditioning, a mini-bar, and more.',
  },
  {
    id: 'penthouse',
    image: penthouseImg,
    titleKey: 'room.penthouse',
    price: '$800',
    description: 'The Penthouse Suite is Elysium Hotel\'s most luxurious accommodation. It features a spacious living and dining area, a king-size bed, a private balcony with panoramic city views, and the largest bathroom with jacuzzi.',
  },
];

const services = [
  { id: 'concierge', image: conciergeImg, title: '24/7 Concierge', description: 'Round-the-clock assistance for all your needs' },
  { id: 'room-service', image: roomServiceImg, title: 'Room Service', description: 'Fine dining delivered to your room anytime' },
  { id: 'spa', image: spaImg, title: 'Spa & Wellness', description: 'Rejuvenate with our premium spa treatments' },
  { id: 'business', image: businessImg, title: 'Business Center', description: 'Fully equipped facilities for business travelers' },
  { id: 'event', image: eventImg, title: 'Event Hosting', description: 'Perfect venues for conferences and celebrations' },
  { id: 'airport', image: airportImg, title: 'Airport Transfer', description: 'Convenient transportation to and from airport' },
];

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '' });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('elysium_reviews') || '[]');
    setReviews(storedReviews);
  }, []);

  const totalReviews = 3247 + reviews.length;
  const averageRating = reviews.length > 0 
    ? ((4.9 * 3247 + reviews.reduce((sum, r) => sum + r.rating, 0)) / totalReviews).toFixed(1)
    : '4.9';

  const displayedReviews = reviews.length > 0 
    ? reviews.slice(-3).reverse()
    : [
        { id: '1', name: 'Nasus vs Godzilla', rating: 5, text: 'An absolute paradise! Every detail was perfect.', createdAt: '' },
        { id: '2', name: 'Sarah Mitchell', rating: 5, text: 'Exceptional service and breathtaking views!', createdAt: '' },
        { id: '3', name: 'James Anderson', rating: 5, text: 'Truly a luxurious escape from the everyday world.', createdAt: '' },
      ];

  const handleDiscoverClick = () => {
    if (isAuthenticated) {
      navigate('/booking');
    } else {
      navigate('/login');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }
    if (!reviewForm.text.trim()) {
      toast.error('Please write a review');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: user?.fullName || 'Guest',
      rating: reviewForm.rating,
      text: reviewForm.text,
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('elysium_reviews', JSON.stringify(updatedReviews));
    
    setReviewForm({ rating: 5, text: '' });
    setShowReviewModal(false);
    toast.success('Thank you for your review!');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/30 to-foreground/60" />
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-4 tracking-tight">
            {t('hero.welcome')}
          </h1>
          <p className="font-accent text-xl md:text-2xl text-white/90 italic mb-10">
            {t('hero.subtitle')}
          </p>
          <button
            onClick={handleDiscoverClick}
            className="px-10 py-5 bg-foreground text-background text-sm font-medium tracking-[0.15em] hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg"
          >
            {t('hero.cta')}
          </button>
        </div>
      </section>

      {/* Exclusive Amenities */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-16">{t('amenities.title')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <Link
                key={amenity.id}
                to={`/amenities#${amenity.id}`}
                className="group block animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <img
                    src={amenity.image}
                    alt={t(amenity.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                  {t(amenity.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm">{t(amenity.descKey)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-16">{t('rooms.title')}</h2>
          
          <div className="space-y-16">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-elegant">
                    <img
                      src={room.image}
                      alt={t(room.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <h3 className="font-display text-2xl md:text-3xl">{t(room.titleKey)}</h3>
                  <p className="text-accent font-display text-xl">{room.price} <span className="text-muted-foreground text-sm font-body">/ night</span></p>
                  <p className="text-muted-foreground leading-relaxed">{room.description}</p>
                  <div className="flex gap-4 pt-4">
                    <Link
                      to={`/accommodations#${room.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {t('room.learnMore')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/booking?room=${room.id}`}
                      className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 transition-colors"
                    >
                      {t('room.bookNow')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-4">{t('location.title')}</h2>
            <p className="font-accent text-xl text-muted-foreground italic">{t('location.subtitle')}</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Elysium is strategically nestled in the most coveted location, offering seamless access to cultural attractions, fine dining, and vibrant entertainment venues.
              </p>
              <p className="font-medium">
                <span className="text-accent">Address:</span> Quirino Highway, Novaliches, Quezon City, 12345
              </p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-elegant">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5714285714285!2d121.0!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzAwLjAiTiAxMjHCsDAwJzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Elevated Services */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-16">{t('services.title')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/services#${service.id}`}
                className="group flex gap-4 p-4 rounded-lg hover:bg-background transition-colors animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg mb-1 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-6">{t('testimonials.title')}</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="font-display text-5xl text-accent">{averageRating}</span>
              <div>
                <div className="flex gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Based on {totalReviews.toLocaleString()} reviews</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayedReviews.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-card p-8 rounded-lg shadow-sm animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 text-accent mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-accent text-lg italic text-muted-foreground mb-4">
                  "{testimonial.text}"
                </p>
                <p className="font-medium">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Review Button */}
      <button
        onClick={() => setShowReviewModal(true)}
        className="fixed bottom-8 right-8 p-4 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-110 z-50"
        aria-label="Submit Review"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-foreground/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-elegant max-w-md w-full p-8 animate-fade-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl">Share Your Experience</h3>
              <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || reviewForm.rating)
                            ? 'text-accent fill-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="Tell us about your stay..."
                  rows={4}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
