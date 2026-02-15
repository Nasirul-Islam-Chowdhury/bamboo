"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { UserProfile } from "@/types";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  registerWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(user: User): UserProfile {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    authProvider: "firebase",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [manualChecked, setManualChecked] = useState(false);
  const [firebaseChecked, setFirebaseChecked] = useState(false);

  // Check for manual JWT session on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            uid: data.user.id,
            email: data.user.email,
            displayName: data.user.name,
            photoURL: null,
            authProvider: "manual",
          });
        }
      })
      .catch(() => {})
      .finally(() => setManualChecked(true));
  }, []);

  // Listen for Firebase auth state
  useEffect(() => {
    if (!auth) {
      setFirebaseChecked(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      }
      setFirebaseChecked(true);
    });
    return unsubscribe;
  }, []);

  // Loading is done when both checks complete
  useEffect(() => {
    if (manualChecked && firebaseChecked) {
      setLoading(false);
    }
  }, [manualChecked, firebaseChecked]);

  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      throw new Error("Google sign-in is not available");
    }
    await signInWithPopup(auth, googleProvider);
  }, []);

  const loginWithEmail = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ error?: string }> => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          return { error: data.error || "Login failed" };
        }
        setUser({
          uid: data.user.id,
          email: data.user.email,
          displayName: data.user.name,
          photoURL: null,
          authProvider: "manual",
        });
        return {};
      } catch {
        return { error: "Network error. Please try again." };
      }
    },
    []
  );

  const registerWithEmail = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ error?: string }> => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          return { error: data.error || "Registration failed" };
        }
        setUser({
          uid: data.user.id,
          email: data.user.email,
          displayName: data.user.name,
          photoURL: null,
          authProvider: "manual",
        });
        return {};
      } catch {
        return { error: "Network error. Please try again." };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    if (user?.authProvider === "firebase" && auth) {
      await firebaseSignOut(auth);
    }
    // Always clear manual cookie too
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
