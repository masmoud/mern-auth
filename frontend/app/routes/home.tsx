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
            Bienvenue sur <span className="text-blue-600">MERN Auth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Une application sécurisée construite avec MongoDB, Express, React et Node.js
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sign-in"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Connexion
            </a>
            <a
              href="/sign-up"
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Inscription
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sécurité</h3>
            <p className="text-gray-600">Authentification JWT et protection des routes</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance</h3>
            <p className="text-gray-600">Optimisé pour une expérience utilisateur fluide</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Moderne</h3>
            <p className="text-gray-600">Interface utilisateur élégante et responsive</p>
          </div>
        </div>
      </div>
    </div>
  );
}
