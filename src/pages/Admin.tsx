import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Users, Calendar, FileText, Star, LogOut, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export default function Admin() {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('elysium_bookings') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('elysium_users') || '[]'));
    setReviews(JSON.parse(localStorage.getItem('elysium_reviews') || '[]'));
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
        <button
          onClick={logout}
          className="mt-8 w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
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
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl mb-2">Welcome, {user?.fullName}</h2>
          <p className="text-muted-foreground">Manage your hotel operations</p>
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
                <h3 className="font-display text-xl">All User Reviews</h3>
              </div>
              <div className="divide-y divide-border">
                {reviews.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No user reviews yet</div>
                ) : (
                  reviews.map(review => (
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
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
