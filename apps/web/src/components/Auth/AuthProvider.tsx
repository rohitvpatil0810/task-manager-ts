import APIEndpoints from "@/config/apiEndpoints";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string> | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(APIEndpoints.AUTH.ME, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.data);
        setError(null);
        setValidationErrors(null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      clearError();
      const response = await axios.post(APIEndpoints.AUTH.LOGIN, {
        email,
        password,
      });
      setUser(response.data.data.user);
      localStorage.setItem("token", response.data.data.token);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data.data);
      } else if (error.response && error.response.status === 401) {
        setError(error.respone.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(APIEndpoints.AUTH.LOGOUT, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const clearError = () => {
    setError(null);
    setValidationErrors(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
        validationErrors,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
