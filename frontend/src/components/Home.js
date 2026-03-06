import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Hero Section */}
      <div className="text-center pt-20 pb-16 px-6 relative z-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight animate-fadeIn">
          🛒 BudegetBuddy
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Manage products, stock levels, and suppliers with a powerful
          Finance dashboard built with the MERN stack.
        </p>

        <div className="mt-8">
          <Link to="/dashboard">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
               Open Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 pb-20 relative z-10">

        {/* Dashboard Card */}
        <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
          <div className="text-5xl mb-4">📊</div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Dashboard
          </h3>

          <p className="text-gray-600">
            Monitor stock levels, low inventory alerts and overall statistics.
          </p>

          <Link to="/dashboard">
            <button className="mt-6 w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
              Open Dashboard
            </button>
          </Link>
        </div>

        {/* Product List Card */}
        <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
          <div className="text-5xl mb-4">📦</div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Product List
          </h3>

          <p className="text-gray-600">
            View, search, update and delete products from inventory.
          </p>

          <Link to="/products">
            <button className="mt-6 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
              View Products
            </button>
          </Link>
        </div>

        {/* Add Product Card */}
        <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
          <div className="text-5xl mb-4">➕</div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Add Product
          </h3>

          <p className="text-gray-600">
            Add new grocery items and manage supplier details.
          </p>

          <Link to="/products">
            <button className="mt-6 w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
              Add Product
            </button>
          </Link>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center pb-6 text-gray-500 text-sm">
        Built with ❤️ using MERN Stack
      </div>
    </div>
  );
}

export default Home;
