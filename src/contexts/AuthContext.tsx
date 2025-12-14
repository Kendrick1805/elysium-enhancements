import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; requiresOtp?: boolean; error?: string }>;
  verifyOtp: (otp: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  pendingAuth: { username: string; email: string } | null;
}

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database
const USERS_KEY = 'elysium_users';
const CURRENT_USER_KEY = 'elysium_current_user';

const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingAuth, setPendingAuth] = useState<{ username: string; email: string } | null>(null);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('Generated OTP:', otp); // In production, this would be sent via email
    return otp;
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; requiresOtp?: boolean; error?: string }> => {
    // Check for admin credentials
    if (username === 'admin' && password === '12345') {
      const adminUser: User = {
        id: 'admin',
        username: 'admin',
        email: 'admin@elysium.com',
        fullName: 'Administrator',
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    // Check regular users
    const users = getUsers();
    const storedPasswords = JSON.parse(localStorage.getItem('elysium_passwords') || '{}');
    const foundUser = users.find(u => u.username === username);
    
    if (foundUser && storedPasswords[username] === password) {
      setPendingAuth({ username: foundUser.username, email: foundUser.email });
      generateOtp();
      return { success: true, requiresOtp: true };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const verifyOtp = async (otp: string): Promise<{ success: boolean; error?: string }> => {
    if (otp === generatedOtp && pendingAuth) {
      const users = getUsers();
      const foundUser = users.find(u => u.username === pendingAuth.username);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
        setPendingAuth(null);
        setGeneratedOtp('');
        return { success: true };
      }
    }
    return { success: false, error: 'Invalid OTP code' };
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    
    if (users.find(u => u.username === data.username)) {
      return { success: false, error: 'Username already exists' };
    }
    
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      isAdmin: false,
    };

    users.push(newUser);
    saveUsers(users);

    // Store password separately (in production, this would be hashed and stored securely)
    const passwords = JSON.parse(localStorage.getItem('elysium_passwords') || '{}');
    passwords[data.username] = data.password;
    localStorage.setItem('elysium_passwords', JSON.stringify(passwords));

    // Auto-login after signup
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setPendingAuth(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false,
      login,
      verifyOtp,
      signup,
      logout,
      pendingAuth,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
