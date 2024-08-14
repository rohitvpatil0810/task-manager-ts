import APIEndpoints from "@/config/apiEndpoints";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import routes from "@/config/routes";

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
  googleSignin: (tokenId: any) => Promise<void>;
  signup: (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string> | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const googleSignin = async (tokenId: any) => {
    try {
      clearError();
      const response = await axios.post(APIEndpoints.AUTH.GOOGLE_SIGNIN, {
        tokenId: tokenId.credential,
      });
      setUser(response.data.data.user);
      localStorage.setItem("token", response.data.data.token);
      toast({
        description: "Login successful",
      });
      toast({ description: response.data.message });
      navigate(routes.home);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast({
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      clearError();
      const response = await axios.post(APIEndpoints.AUTH.LOGIN, {
        email,
        password,
      });
      setUser(response.data.data.user);
      localStorage.setItem("token", response.data.data.token);
      navigate(routes.home);
      toast({
        description: response.data.message,
      });
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data.data);
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        setError(error.response.data.message);
        toast({
          description: error.response.data.message,
        });
      } else {
        setError("Something went wrong. Please try again.");
        toast({
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const signup = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
  }) => {
    try {
      clearError();
      const response = await axios.post(APIEndpoints.AUTH.SIGNUP, values);
      toast({
        description: "Signup successful",
      });
      toast({ description: response.data.message });
      navigate(routes.login);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message !== "Bad Request") {
          setError(error.response.data.message);
          toast({
            description: error.response.data.message,
          });
        }
        setValidationErrors(error.response.data.data);
      } else {
        setError("Something went wrong. Please try again.");
        toast({
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(APIEndpoints.AUTH.LOGOUT, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(null);
      localStorage.removeItem("token");
      toast({ description: response.data.message });
      navigate(routes.login);
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
        googleSignin,
        signup,
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
