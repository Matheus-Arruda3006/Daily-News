import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, User } from '../services/api';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  subscribeModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;
  setSubscribeModalOpen: (open: boolean) => void;
  openLogin: () => void;
  openRegister: () => void;
  openSubscribe: () => void;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGithub: (name?: string, email?: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  subscribe: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('@DailyNews:user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('@DailyNews:token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('@DailyNews:user', JSON.stringify(res.data.user));
          }
        } catch {
          // Se token expirou ou offline, mantém o usuário em cache se houver
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const openLogin = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
  };

  const openSubscribe = () => {
    setSubscribeModalOpen(true);
  };

  const login = async (email: string, password = 'password123') => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: userData, token } = res.data;
      localStorage.setItem('@DailyNews:token', token);
      localStorage.setItem('@DailyNews:user', JSON.stringify(userData));
      setUser(userData);
      setAuthModalOpen(false);
    } catch {
      // Simulação rápida para demo
      const mockUser: User = {
        id: 1,
        name: email.split('@')[0],
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        role: 'user',
        is_subscribed: false,
      };
      localStorage.setItem('@DailyNews:token', 'demo_token_' + Date.now());
      localStorage.setItem('@DailyNews:user', JSON.stringify(mockUser));
      setUser(mockUser);
      setAuthModalOpen(false);
    }
  };

  const loginWithGithub = async (
    name = 'Dev Explorer',
    email = 'github.user@example.com'
  ) => {
    try {
      const res = await api.post('/auth/github', {
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        github_id: 'gh_' + Date.now(),
      });
      const { user: userData, token } = res.data;
      localStorage.setItem('@DailyNews:token', token);
      localStorage.setItem('@DailyNews:user', JSON.stringify(userData));
      setUser(userData);
      setAuthModalOpen(false);
    } catch {
      const mockUser: User = {
        id: 99,
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        role: 'user',
        is_subscribed: false,
      };
      localStorage.setItem('@DailyNews:token', 'demo_gh_token_' + Date.now());
      localStorage.setItem('@DailyNews:user', JSON.stringify(mockUser));
      setUser(mockUser);
      setAuthModalOpen(false);
    }
  };

  const register = async (name: string, email: string, password = 'password123') => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { user: userData, token } = res.data;
      localStorage.setItem('@DailyNews:token', token);
      localStorage.setItem('@DailyNews:user', JSON.stringify(userData));
      setUser(userData);
      setAuthModalOpen(false);
    } catch {
      const mockUser: User = {
        id: 2,
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        role: 'user',
        is_subscribed: false,
      };
      localStorage.setItem('@DailyNews:token', 'demo_token_' + Date.now());
      localStorage.setItem('@DailyNews:user', JSON.stringify(mockUser));
      setUser(mockUser);
      setAuthModalOpen(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignorar erros de logout em mock
    }
    localStorage.removeItem('@DailyNews:token');
    localStorage.removeItem('@DailyNews:user');
    setUser(null);
  };

  const subscribe = async (planId: string) => {
    try {
      const res = await api.post('/subscriptions/subscribe', { plan_id: planId });
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('@DailyNews:user', JSON.stringify(res.data.user));
      }
    } catch {
      if (user) {
        const updated = {
          ...user,
          is_subscribed: true,
          subscription_tier: planId === 'price_annual' ? ('annual' as const) : ('monthly' as const),
        };
        setUser(updated);
        localStorage.setItem('@DailyNews:user', JSON.stringify(updated));
      }
    }

    // Disparar confetes de comemoração
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#61dafb', '#eba417', '#04d361', '#ffffff'],
      });
    } catch {
      // Confetti opcional
    }

    setSubscribeModalOpen(false);
  };

  const cancelSubscription = async () => {
    try {
      const res = await api.post('/subscriptions/cancel');
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('@DailyNews:user', JSON.stringify(res.data.user));
      }
    } catch {
      if (user) {
        const updated = { ...user, is_subscribed: false, subscription_tier: null };
        setUser(updated);
        localStorage.setItem('@DailyNews:user', JSON.stringify(updated));
      }
    }
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updatedData };
      setUser(updated);
      localStorage.setItem('@DailyNews:user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isSubscribed: !!user?.is_subscribed,
        isLoading,
        authModalOpen,
        authModalMode,
        subscribeModalOpen,
        setAuthModalOpen,
        setAuthModalMode,
        setSubscribeModalOpen,
        openLogin,
        openRegister,
        openSubscribe,
        login,
        loginWithGithub,
        register,
        logout,
        subscribe,
        cancelSubscription,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
