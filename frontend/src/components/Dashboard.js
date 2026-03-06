import { useEffect, useState } from "react";
import API from "../api";
import AIChat from "../components/AIChat";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalCategories: 0,
  });

  const [categoryData, setCategoryData] = useState([]);

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];

  const fetchStats = async () => {
    try {
      const res = await API.get("/products");

      const products = res.data;

      const totalProducts = products.length;
      const lowStock = products.filter((p) => p.quantity < 5).length;

      const categories = {};

      products.forEach((p) => {
        categories[p.category] = (categories[p.category] || 0) + 1;
      });

      const categoryChart = Object.keys(categories).map((key) => ({
        name: key,
        value: categories[key],
      }));

      setStats({
        totalProducts,
        lowStock,
        totalCategories: Object.keys(categories).length,
      });

      setCategoryData(categoryChart);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          📊 Finance Dashboard
        </h1>

        <p className="text-gray-600">
          Monitor your finance management performance in real time
        </p>
      </div>
      {/* EXPORT REPORT BUTTONS */}

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => window.open("http://localhost:5000/api/reports/csv")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          📄 Export CSV
        </button>

        <button
          onClick={() => window.open("http://localhost:5000/api/reports/pdf")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          📑 Export PDF
        </button>
      </div>

      {/* STAT CARDS */}

      <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
        {/* TOTAL PRODUCTS */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
          <div className="text-5xl mb-3">📦</div>

          <h3 className="text-gray-600 text-lg">Total Products</h3>

          <h2 className="text-4xl font-bold text-indigo-600 mt-2">
            {stats.totalProducts}
          </h2>
        </div>

        {/* LOW STOCK */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
          <div className="text-5xl mb-3">⚠️</div>

          <h3 className="text-gray-600 text-lg">Low Stock Items</h3>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {stats.lowStock}
          </h2>
        </div>

        {/* TOTAL CATEGORIES */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
          <div className="text-5xl mb-3">📂</div>

          <h3 className="text-gray-600 text-lg">Total Categories</h3>

          <h2 className="text-4xl font-bold text-purple-600 mt-2">
            {stats.totalCategories}
          </h2>
        </div>
      </div>

      {/* CHART SECTION */}

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* BAR CHART */}

        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            📊 Products by Category
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}

        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            🥧 Category Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FOOTER */}

      <div className="text-center mt-16 text-gray-500 text-sm">
        MERN Finance Manager Dashboard
      </div>
      <AIChat />
    </div>
  );
}

export default Dashboard;
