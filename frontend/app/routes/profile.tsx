import { useNavigate } from "react-router";
import useAuth from "~/auth/use-auth";
import env from "~/config/env";
import type { Route } from "./+types/profile";

export type LoaderData = {
  _id: string;
  name: string;
  email: string;
  role: string; // tu peux affiner à "admin" | "user" si les rôles sont limités
  createdAt: string; // ou Date si tu les convertis avec `new Date(...)`
  updatedAt: string;
  __v: number;
};

export async function loader() {
  const res = await fetch(`${env.apiUrl}/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

const Profile = ({ loaderData: users }: Route.ComponentProps) => {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
          <p className="text-gray-600 mb-6">You must be logged in to access this page.</p>
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        {error && <p className="text-red-600 mb-6">{error}</p>}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome {user?.name}</h1>
        <p className="text-gray-600 mb-6">You are logged in as {user?.email}</p>
        <p className="text-gray-600 mb-6">Your role is {user?.role}</p>
        <p className="text-gray-600 mb-6">Your id is {user?._id}</p>
        <div className="flex gap-4 mb-6">
          <button
            onClick={logout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Logout
          </button>
        </div>

        {users.length > 0 && isAdmin && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>
            <ul className="space-y-2">
              {users.map((u: LoaderData) => (
                <li key={u._id} className="text-gray-700 border-b pb-2">
                  {u.name} - {u.email} ({u.role})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
