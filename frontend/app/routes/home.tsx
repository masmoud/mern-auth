import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "MERN Auth" }, { name: "description", content: "Welcome to MERN Auth" }];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">MERN Auth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A secure application built with MongoDB, Express, React and Node.js
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sign-in"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Sign In
            </a>
            <a
              href="/sign-up"
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Sign Up
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Authentication</h3>
            <p className="text-gray-600">Authentication with JWT and route protection</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Performances</h3>
            <p className="text-gray-600">Optimized for a smooth user experience</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern</h3>
            <p className="text-gray-600">Modern and responsive user interface</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-gray-500">
            Developed by{" "}
            <Link
              to="https://amoussamohamed.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline">
              Mohamed Amoussa
            </Link>{" "}
            ·{" "}
            <Link
              to="https://github.com/masmoud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline">
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
