import { useEffect, useState } from "react";
import API from "../api";
import AddProduct from "./AddProduct";

function ProductList({ refreshStats }) {

  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch Products
  const fetchProducts = async (searchQuery = "", categoryQuery = "") => {
    try {
      const res = await API.get(
        `/products?search=${searchQuery}&category=${categoryQuery}`
      );

      setProducts(res.data || []);

      const uniqueCategories = [
        ...new Set((res.data || []).map((item) => item.category)),
      ];

      setCategories(uniqueCategories);

    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      fetchProducts(search, category);

      if (refreshStats) refreshStats();

    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  // Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts(value, category);
  };

  // Category Filter
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    fetchProducts(search, value);
  };

  return (
    <div style={styles.container}>

      <AddProduct
        refreshProducts={() => {
          fetchProducts(search, category);
          if (refreshStats) refreshStats();
        }}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

      <h2 style={styles.title}>📦 Inventory Products</h2>

      {/* Search + Filter */}

      <div style={styles.filterContainer}>

        <input
          type="text"
          placeholder="🔍 Search product..."
          value={search}
          onChange={handleSearch}
          style={styles.searchInput}
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          style={styles.dropdown}
        >
          <option value="">All Categories</option>

          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}

        </select>

      </div>

      {/* Table */}

      <div style={styles.tableContainer}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>
                <td colSpan="6" style={styles.empty}>
                  🚫 No Products Found
                </td>
              </tr>

            ) : (

              products.map((product) => (

                <tr key={product._id} style={styles.row}>

                  <td>{product.name}</td>

                  <td>
                    <span style={styles.category}>
                      {product.category}
                    </span>
                  </td>

                  <td>₹ {product.price}</td>

                  <td>
                    {product.quantity}

                    {product.quantity < 5 && (
                      <span style={styles.lowStock}>
                        Low Stock
                      </span>
                    )}

                  </td>

                  <td>{product.supplier}</td>

                  <td>

                    <button
                      style={styles.editBtn}
                      onClick={() => setEditProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    animation: "fadeIn 0.6s ease",
  },

  title: {
    marginBottom: "20px",
  },

  filterContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },

  searchInput: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "250px",
  },

  dropdown: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  tableContainer: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  row: {
    transition: "0.2s",
    cursor: "pointer",
  },

  category: {
    background: "#e3f2fd",
    padding: "4px 10px",
    borderRadius: "12px",
  },

  lowStock: {
    color: "white",
    background: "red",
    marginLeft: "8px",
    padding: "3px 6px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  editBtn: {
    background: "#2196F3",
    border: "none",
    color: "white",
    padding: "6px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#f44336",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "20px",
  },

};

export default ProductList;
