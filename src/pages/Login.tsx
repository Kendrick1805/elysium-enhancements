import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  
  const { login, verifyOtp, pendingAuth } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        if (result.requiresOtp) {
          setStep('otp');
          toast.info(t('auth.otpSent'));
        } else {
          // Admin login - direct access
          toast.success(`${t('auth.welcome')} ${username}`);
          navigate('/admin');
        }
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await verifyOtp(otp);
      
      if (result.success) {
        toast.success(`${t('auth.welcome')} ${pendingAuth?.username}`);
        navigate('/');
      } else {
        toast.error(result.error || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-secondary">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-elegant p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl mb-2">{t('nav.login')}</h1>
            <p className="text-muted-foreground">
              {step === 'credentials' ? 'Enter your credentials' : 'Enter the OTP sent to your email'}
            </p>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.username')}</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {t('nav.login')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.otp')}</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Check your email: {pendingAuth?.email}
                </p>
                <p className="text-xs text-accent mt-1 text-center">
                  (Check browser console for OTP - demo only)
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to login
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent hover:underline font-medium">
                {t('nav.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
