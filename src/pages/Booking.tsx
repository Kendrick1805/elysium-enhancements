import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, CreditCard, Wallet, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import soloRoomImg from '@/assets/solo-room.png';
import deluxeRoomImg from '@/assets/deluxe-room.png';
import twinRoomImg from '@/assets/twin-room.png';
import penthouseImg from '@/assets/penthouse.png';

const defaultRooms = [
  { id: 'solo', name: 'Solo Room', price: 150, image: soloRoomImg, available: true },
  { id: 'deluxe', name: 'Deluxe Room', price: 280, image: deluxeRoomImg, available: true },
  { id: 'twin', name: 'Twin Deluxe Room', price: 350, image: twinRoomImg, available: true },
  { id: 'penthouse', name: 'Penthouse Suite', price: 800, image: penthouseImg, available: true },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get('room') || '';
  
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [rooms, setRooms] = useState(defaultRooms);

  useEffect(() => {
    const storedRooms = localStorage.getItem('elysium_rooms');
    if (storedRooms) {
      const parsedRooms = JSON.parse(storedRooms);
      // Merge stored data with default images
      const mergedRooms = defaultRooms.map(defaultRoom => {
        const stored = parsedRooms.find((r: any) => r.id === defaultRoom.id);
        return stored ? { ...defaultRoom, price: stored.price, available: stored.available } : defaultRoom;
      });
      setRooms(mergedRooms);
    }
  }, []);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    selectedRoom: initialRoom,
    checkIn: '',
    checkOut: '',
    paymentMethod: 'walkin',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingName: '',
    country: '',
    address: '',
  });

  const [bookingDetails, setBookingDetails] = useState<{
    confirmationNumber: string;
    room: typeof rooms[0];
    nights: number;
    total: number;
  } | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to make a booking.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const selectedRoomData = rooms.find(r => r.id === formData.selectedRoom);
  const nights = calculateNights();
  const total = selectedRoomData ? selectedRoomData.price * nights : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.selectedRoom) {
      toast.error('Please select a room');
      return;
    }

    if (nights <= 0) {
      toast.error('Please select valid dates');
      return;
    }

    if (formData.email !== user?.email) {
      toast.error('Email must match your registered email');
      return;
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        toast.error('Please fill in all card details');
        return;
      }
    }

    setIsLoading(true);

    // Simulate booking
    await new Promise(resolve => setTimeout(resolve, 2000));

    const confirmationNumber = `ELY-${Date.now().toString(36).toUpperCase()}`;
    
    setBookingDetails({
      confirmationNumber,
      room: selectedRoomData!,
      nights,
      total,
    });

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('elysium_bookings') || '[]');
    bookings.push({
      id: confirmationNumber,
      userId: user?.id,
      userName: formData.fullName,
      userEmail: formData.email,
      roomId: formData.selectedRoom,
      roomName: selectedRoomData?.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights,
      total,
      paymentMethod: formData.paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('elysium_bookings', JSON.stringify(bookings));

    setShowReceipt(true);
    setIsLoading(false);
    toast.success('Booking confirmed! Receipt sent to your email.');
  };

  if (showReceipt && bookingDetails) {
    return (
      <div className="min-h-screen py-20 px-4 bg-secondary">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl shadow-elegant p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="font-display text-3xl mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">Your receipt has been sent to {formData.email}</p>

            <div className="bg-secondary rounded-lg p-6 text-left space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation #</span>
                <span className="font-mono font-medium">{bookingDetails.confirmationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room</span>
                <span className="font-medium">{bookingDetails.room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span>{formData.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span>{formData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nights</span>
                <span>{bookingDetails.nights}</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between text-lg">
                <span className="font-medium">Total</span>
                <span className="font-display text-accent">${bookingDetails.total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl mb-4">Book Your Stay</h1>
          <p className="text-muted-foreground">Complete your reservation at Elysium Hotel</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-card rounded-xl shadow-elegant overflow-hidden">
            {/* Guest Information */}
            <div className="p-8 border-b border-border">
              <h2 className="font-display text-xl mb-6">Guest Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('auth.fullName')}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Must match your registered email</p>
                </div>
              </div>
            </div>

            {/* Room Selection */}
            <div className="p-8 border-b border-border">
              <h2 className="font-display text-xl mb-6">Select Your Room</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <label
                    key={room.id}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      !room.available 
                        ? 'opacity-50 cursor-not-allowed border-transparent' 
                        : formData.selectedRoom === room.id
                          ? 'border-accent shadow-gold cursor-pointer'
                          : 'border-transparent hover:border-border cursor-pointer'
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedRoom"
                      value={room.id}
                      checked={formData.selectedRoom === room.id}
                      onChange={handleChange}
                      disabled={!room.available}
                      className="sr-only"
                    />
                    <div className="aspect-[4/3] relative">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                      {!room.available && (
                        <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                          <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                            Unavailable
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-background">
                      <p className="font-medium text-sm">{room.name}</p>
                      <p className="text-accent text-sm">${room.price}/night</p>
                    </div>
                    {formData.selectedRoom === room.id && room.available && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="p-8 border-b border-border">
              <h2 className="font-display text-xl mb-6">Select Dates</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
              {selectedRoomData && (
                <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Room:</span> {selectedRoomData.name}</p>
                      <p><span className="text-muted-foreground">Rate:</span> ${selectedRoomData.price}/night</p>
                      {nights > 0 && <p><span className="text-muted-foreground">Duration:</span> {nights} night{nights > 1 ? 's' : ''}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-display text-2xl text-accent">${nights > 0 ? total : selectedRoomData.price}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="p-8 border-b border-border">
              <h2 className="font-display text-xl mb-6">Payment Method</h2>
              
              <div className="flex gap-4 mb-6">
                <label className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.paymentMethod === 'walkin' ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="walkin"
                    checked={formData.paymentMethod === 'walkin'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-accent" />
                    <div>
                      <p className="font-medium">Walk-in Payment</p>
                      <p className="text-sm text-muted-foreground">Pay at the hotel</p>
                    </div>
                  </div>
                </label>

                <label className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-accent" />
                    <div>
                      <p className="font-medium">Card Payment</p>
                      <p className="text-sm text-muted-foreground">Pay now with card</p>
                    </div>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Billing Name</label>
                    <input
                      type="text"
                      name="billingName"
                      value={formData.billingName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Country/Region</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="p-8 bg-secondary">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg">Total Amount</span>
                <span className="font-display text-3xl text-accent">${total}</span>
              </div>
              <button
                type="submit"
                disabled={isLoading || !formData.selectedRoom || nights <= 0}
                className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                Confirm Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
