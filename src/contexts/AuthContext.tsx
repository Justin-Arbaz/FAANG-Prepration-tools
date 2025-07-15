import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  hasCompletedOnboarding: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  targetCompanies: string[];
  timeline: '6months' | '12months';
  currentStreak: number;
  totalXP: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        hasCompletedOnboarding: true,
        level: 'intermediate',
        targetCompanies: ['Google', 'Meta', 'Amazon'],
        timeline: '6months',
        currentStreak: 7,
        totalXP: 2450,
        badges: ['First Week', 'Problem Solver', 'Consistent Learner']
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Alex Johnson',
        email,
        hasCompletedOnboarding: false,
        level: 'beginner',
        targetCompanies: [],
        timeline: '6months',
        currentStreak: 0,
        totalXP: 0,
        badges: []
      });
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
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