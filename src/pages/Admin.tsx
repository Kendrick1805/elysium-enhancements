import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Users, Calendar, FileText, Star, LogOut, Trash2, Home, BedDouble, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import soloRoomImg from '@/assets/solo-room.png';
import deluxeRoomImg from '@/assets/deluxe-room.png';
import twinRoomImg from '@/assets/twin-room.png';
import penthouseImg from '@/assets/penthouse.png';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface Room {
  id: string;
  name: string;
  price: number;
  available: boolean;
  image: string;
}

const defaultRooms: Room[] = [
  { id: 'solo', name: 'Solo Room', price: 150, available: true, image: soloRoomImg },
  { id: 'deluxe', name: 'Deluxe Room', price: 280, available: true, image: deluxeRoomImg },
  { id: 'twin', name: 'Twin Deluxe Room', price: 350, available: true, image: twinRoomImg },
  { id: 'penthouse', name: 'Penthouse Suite', price: 800, available: true, image: penthouseImg },
];

export default function Admin() {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSort, setReviewSort] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ price: 0, available: true });

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('elysium_bookings') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('elysium_users') || '[]'));
    setReviews(JSON.parse(localStorage.getItem('elysium_reviews') || '[]'));
    const storedRooms = localStorage.getItem('elysium_rooms');
    setRooms(storedRooms ? JSON.parse(storedRooms) : defaultRooms);
  }, []);

  if (!isAdmin) return <Navigate to="/" replace />;

  const totalReviews = 3247 + reviews.length;
  const averageRating = reviews.length > 0 
    ? ((4.9 * 3247 + reviews.reduce((sum, r) => sum + r.rating, 0)) / totalReviews).toFixed(1)
    : '4.9';

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar },
    { label: 'Registered Users', value: users.length, icon: Users },
    { label: 'Revenue', value: `$${bookings.reduce((sum, b) => sum + (b.total || 0), 0).toLocaleString()}`, icon: FileText },
    { label: 'Total Reviews', value: totalReviews.toLocaleString(), icon: Star },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Rooms', icon: BedDouble },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviews.filter(r => r.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem('elysium_reviews', JSON.stringify(updatedReviews));
    toast.success('Review deleted');
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room.id);
    setEditForm({ price: room.price, available: room.available });
  };

  const handleSaveRoom = (roomId: string) => {
    const updatedRooms = rooms.map(r => 
      r.id === roomId ? { ...r, price: editForm.price, available: editForm.available } : r
    );
    setRooms(updatedRooms);
    localStorage.setItem('elysium_rooms', JSON.stringify(updatedRooms));
    setEditingRoom(null);
    toast.success('Room updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="font-display text-xl text-sidebar-primary">ELYSIUM</h1>
          <p className="text-sm text-sidebar-foreground/60">Admin Panel</p>
        </div>
        <nav className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sidebar-accent/50 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs ${
                activeTab === tab.id ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pb-24 lg:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-2">Welcome, {user?.fullName}</h2>
            <p className="text-muted-foreground">Manage your hotel operations</p>
          </div>
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-card rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-display">{stat.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="font-display text-xl mb-2">Room Management</h3>
              <p className="text-muted-foreground text-sm">Edit room prices and availability</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {rooms.map(room => (
                <div key={room.id} className="bg-card rounded-xl shadow-sm overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-display text-lg">{room.name}</h4>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          room.available 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {room.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="font-display text-xl text-accent">${room.price}<span className="text-sm text-muted-foreground font-body">/night</span></p>
                    </div>

                    {editingRoom === room.id ? (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div>
                          <label className="block text-sm font-medium mb-2">Price per night ($)</label>
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent"
                            min="0"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium">Availability:</label>
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, available: !editForm.available })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              editForm.available ? 'bg-green-500' : 'bg-muted'
                            }`}
                          >
                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              editForm.available ? 'left-7' : 'left-1'
                            }`} />
                          </button>
                          <span className="text-sm text-muted-foreground">
                            {editForm.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveRoom(room.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="w-full mt-4 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                      >
                        Edit Room
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border">
              <h3 className="font-display text-xl">All Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">ID</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Guest</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium hidden md:table-cell">Room</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium hidden lg:table-cell">Dates</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Total</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-secondary/50">
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-mono">{b.id}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{b.userName}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm hidden md:table-cell">{b.roomName}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm hidden lg:table-cell">{b.checkIn} - {b.checkOut}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-accent">${b.total}</td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">{b.status}</span>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No bookings yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border">
              <h3 className="font-display text-xl">Registered Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Name</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Username</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium hidden md:table-cell">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-secondary/50">
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{u.fullName}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{u.username}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm hidden md:table-cell">{u.email}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No users yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl mb-2">Guest Reviews Overview</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl text-accent">{averageRating}</span>
                    <div className="flex gap-1 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">({totalReviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">User Submitted</p>
                  <p className="font-display text-2xl">{reviews.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-display text-xl">All User Reviews</h3>
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={ratingFilter ?? ''}
                      onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
                      className="px-3 py-2 text-sm border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent"
                    >
                      <option value="">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                    <select
                      value={reviewSort}
                      onChange={(e) => setReviewSort(e.target.value as typeof reviewSort)}
                      className="px-3 py-2 text-sm border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {(() => {
                  let filteredReviews = ratingFilter 
                    ? reviews.filter(r => r.rating === ratingFilter)
                    : reviews;
                  
                  const sortedReviews = [...filteredReviews].sort((a, b) => {
                    switch (reviewSort) {
                      case 'newest':
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                      case 'oldest':
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                      case 'highest':
                        return b.rating - a.rating;
                      case 'lowest':
                        return a.rating - b.rating;
                      default:
                        return 0;
                    }
                  });

                  if (sortedReviews.length === 0) {
                    return <div className="p-8 text-center text-muted-foreground">
                      {ratingFilter ? `No ${ratingFilter}-star reviews` : 'No user reviews yet'}
                    </div>;
                  }

                  return sortedReviews.map(review => (
                    <div key={review.id} className="p-4 md:p-6 hover:bg-secondary/50">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex gap-0.5 text-accent">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">"{review.text}"</p>
                          <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
