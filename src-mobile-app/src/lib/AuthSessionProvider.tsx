import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from './supabaseClient'; // Ensure this correctly points to your initialized Supabase client

interface User {
  id: string;
  email: string;
}

interface AuthSessionContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthSessionContext = createContext<AuthSessionContextType | undefined>(undefined);

export const AuthSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      Alert.alert("Sign In Failed", error.message);
      return;
    }
    setUser(user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign Out Failed", error.message);
      return;
    }
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthSessionContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthSessionProvider');
  }
  return context;
}
