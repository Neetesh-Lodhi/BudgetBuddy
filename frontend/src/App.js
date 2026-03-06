import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import API from "./api";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [isLogin, setIsLogin] = useState(true);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    totalInventoryValue: 0,
    lowStockCount: 0
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/products/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // AUTH PAGES
 if (!isAuthenticated) {
   return isLogin ? (
     <Login setIsAuthenticated={setIsAuthenticated} setIsLogin={setIsLogin} />
   ) : (
     //  <Signup setIsAuthenticated={setIsAuthenticated} setIsLogin={setIsLogin} />
     <Signup setIsLogin={setIsLogin} />
   );
 }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* SIDEBAR */}

      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col shadow-2xl">

        {/* Logo */}

        <div className="text-2xl font-bold p-6 border-b border-white/20 text-center tracking-wide">
          📦 Finance Manager
        </div>

        {/* Navigation */}

        <nav className="flex flex-col gap-2 p-5 text-lg">

          <Link
            to="/home"
            className="hover:bg-white/20 p-3 rounded-lg transition duration-300"
          >
            🏠 Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:bg-white/20 p-3 rounded-lg transition duration-300"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/products"
            className="hover:bg-white/20 p-3 rounded-lg transition duration-300"
          >
            📦 Products
          </Link>

          <Link
            to="/add-product"
            className="hover:bg-white/20 p-3 rounded-lg transition duration-300"
          >
            ➕ Add Product
          </Link>

        </nav>

        {/* Logout */}

        <div className="mt-auto p-5">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 transition p-3 rounded-lg font-semibold shadow-lg"
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP NAVBAR */}

        <div className="h-16 bg-white/70 backdrop-blur-lg shadow-md flex items-center justify-between px-8">

          <h1 className="text-xl font-semibold text-gray-700">
            Finance Manager
          </h1>

          <div className="flex items-center gap-4">

            <div className="text-gray-600 font-medium">
              Welcome 👋
            </div>

            <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full">
              U
            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}

        <div className="flex-1 overflow-y-auto p-8">

          <Routes>

            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/home" element={<Home />} />

            <Route
              path="/dashboard"
              element={<Dashboard stats={stats} />}
            />

            <Route
              path="/products"
              element={<ProductList refreshStats={fetchStats} />}
            />

            <Route
              path="/add-product"
              element={<AddProduct refreshProducts={fetchStats} />}
            />

          </Routes>

        </div>

      </div>

    </div>
  );
}

export default App;
