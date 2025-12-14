import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Users, Calendar, FileText, Star, Settings, LogOut } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('elysium_bookings') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('elysium_users') || '[]'));
  }, []);

  if (!isAdmin) return <Navigate to="/" replace />;

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar },
    { label: 'Registered Users', value: users.length, icon: Users },
    { label: 'Revenue', value: `$${bookings.reduce((sum, b) => sum + (b.total || 0), 0)}`, icon: FileText },
    { label: 'Avg Rating', value: '4.9', icon: Star },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

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
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'}`}>
              <tab.icon className="w-5 h-5" />{tab.label}
            </button>
          ))}
        </nav>
        <button onClick={logout} className="mt-8 w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl mb-2">Welcome, {user?.fullName}</h2>
          <p className="text-muted-foreground">Manage your hotel operations</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg"><stat.icon className="w-6 h-6 text-accent" /></div>
                  <div><p className="text-2xl font-display">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border"><h3 className="font-display text-xl">All Bookings</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary"><tr><th className="px-6 py-3 text-left text-sm font-medium">ID</th><th className="px-6 py-3 text-left text-sm font-medium">Guest</th><th className="px-6 py-3 text-left text-sm font-medium">Room</th><th className="px-6 py-3 text-left text-sm font-medium">Dates</th><th className="px-6 py-3 text-left text-sm font-medium">Total</th><th className="px-6 py-3 text-left text-sm font-medium">Status</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-secondary/50"><td className="px-6 py-4 text-sm font-mono">{b.id}</td><td className="px-6 py-4 text-sm">{b.userName}</td><td className="px-6 py-4 text-sm">{b.roomName}</td><td className="px-6 py-4 text-sm">{b.checkIn} - {b.checkOut}</td><td className="px-6 py-4 text-sm text-accent">${b.total}</td><td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">{b.status}</span></td></tr>
                  ))}
                  {bookings.length === 0 && <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No bookings yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border"><h3 className="font-display text-xl">Registered Users</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary"><tr><th className="px-6 py-3 text-left text-sm font-medium">Name</th><th className="px-6 py-3 text-left text-sm font-medium">Username</th><th className="px-6 py-3 text-left text-sm font-medium">Email</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {users.map(u => (<tr key={u.id} className="hover:bg-secondary/50"><td className="px-6 py-4 text-sm">{u.fullName}</td><td className="px-6 py-4 text-sm">{u.username}</td><td className="px-6 py-4 text-sm">{u.email}</td></tr>))}
                  {users.length === 0 && <tr><td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No users yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-card rounded-xl shadow-sm p-6">
            <h3 className="font-display text-xl mb-4">Guest Reviews</h3>
            <p className="text-muted-foreground">4.9 ★★★★★ based on 3,247 reviews</p>
          </div>
        )}
      </main>
    </div>
  );
}
