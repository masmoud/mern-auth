import { useEffect } from "react";
import useAuthStore from "~/stores/use-auth-store";

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setError,
    setIsLoading,
    checkAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setError,
    setIsLoading,
    checkAuth,
  };
};

export default useAuth;
