import { create } from "zustand";
import { devtools } from "zustand/middleware";
import env from "~/config/env";
import type { User } from "~/types/user";
import getErrorMessage from "~/utils/error-message";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: (user: User) => {
        set({ user, isAuthenticated: true, isLoading: false, error: null });
      },
      logout: async () => {
        try {
          const response = await fetch(`${env.apiUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
          if (!response.ok) {
            set({ error: "Failed to logout" });
            throw new Error("Failed to logout");
          }
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error) {
          console.error("Logout Error:", error);
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${env.apiUrl}/auth/protected-route`, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          set({ user: data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            error: getErrorMessage(error),
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "AuthStore",
    }
  )
);

export default useAuthStore;
