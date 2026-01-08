import type { User, userLoginValues, userRegisterValues } from "@/types/Auth.ts";
import * as React from "react";
import { loginUser, registerUser, verifyUser } from "@/lib/auth.ts";
import Cookies from "js-cookie";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (credentials: userLoginValues) => Promise<boolean>;
  register: (credentials: userRegisterValues) => Promise<boolean>;
  logout: () => void;
  user: User | null;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({
  children,
  onAuthFail,
}: {
  children: React.ReactNode;
  onAuthFail?: () => void;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const isAuthenticated = !!user;

  const login = async (credentials: userLoginValues) => {
    try {
      const user = await loginUser(credentials);
      if (user) {
        setUser(user);
        return true;
      }
      console.error("Authentication failed", user);
      return false;
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };

  const register = async (credentials: userRegisterValues) => {
    try {
      const user = await registerUser(credentials);
      if (user) {
        setUser(user);
        return true;
      }
      console.error("Registration failed");
      return false;
    } catch (error) {
      console.error("Registration error", error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("Authentication");
    setUser(null);
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verify with backend - cookie sent automatically
        const response = await verifyUser();

        if (response.status === 200 && response.data) {
          setUser(response.data);
        } else {
          throw new Error("Token invalid");
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setUser(null);
        if (onAuthFail) {
          onAuthFail();
        }
      } finally {
        setLoading(false);
      }
    };

    void checkAuth();
  }, [onAuthFail]);

  return (
    <AuthContext value={{ isAuthenticated, login, register, logout, user, loading }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = React.use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
