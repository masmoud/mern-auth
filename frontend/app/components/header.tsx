import { NavLink } from "react-router";
import useAuthStore from "~/stores/use-auth-store";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-blue-600">
            MERN Auth
          </NavLink>

          <div className="flex gap-4">
            <NavLink
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Home
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/sign-in"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Login
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Profile
                </NavLink>
                <button
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => logout()}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
