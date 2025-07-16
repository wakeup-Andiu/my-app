"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseClient";

interface UserContextType {
  user: any;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({ user: null, loading: true, refreshUser: async () => {} });

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      refreshUser();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
