import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mohamed Amoussa
          </div>

          <div className="flex gap-6">
            <NavLink
              to="#"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">
              Portfolio
            </NavLink>
            <NavLink
              to="#"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">
              GitHub
            </NavLink>
            <NavLink
              to="#"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">
              LinkedIn
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
