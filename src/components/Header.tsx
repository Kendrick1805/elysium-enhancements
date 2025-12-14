import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Settings, LogOut, Moon, Sun, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import logoCrest from '@/assets/logo-crest.png';

const languageNames: Record<Language, string> = {
  en: 'English',
  fil: 'Filipino',
  ja: '日本語',
  zh: '中文',
  fr: 'Français',
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/accommodations', label: t('nav.accommodations') },
    { href: '/amenities', label: t('nav.amenities') },
    { href: '/services', label: t('nav.services') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/careers', label: t('nav.careers') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoCrest} alt="Elysium" className="h-10 md:h-12 w-auto" />
            <div className="hidden sm:block">
              <h1 className="font-display text-xl md:text-2xl font-semibold tracking-wide text-foreground">ELYSIUM</h1>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Paradise Awaits</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                  location.pathname === link.href ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Settings Button */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg py-2 animate-scale-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="font-medium text-sm">{t('settings.title')}</p>
                  </div>
                  
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary transition-colors"
                  >
                    <span className="text-sm">{t('settings.darkMode')}</span>
                    {isDark ? <Moon className="w-4 h-4 text-accent" /> : <Sun className="w-4 h-4 text-accent" />}
                  </button>

                  {/* Language Selector */}
                  <div className="px-4 py-2">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      {t('settings.language')}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {(Object.keys(languageNames) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-2 py-1.5 text-xs rounded transition-colors ${
                            language === lang
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          {languageNames[lang]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="hidden sm:block text-sm font-medium">{user?.username}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 animate-scale-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="font-medium text-sm">{user?.fullName}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center gap-2 text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.href
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center"
                  >
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
