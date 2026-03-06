import { useEffect, useState } from "react";
import API from "../api";

function AddProduct({ refreshProducts, editProduct, setEditProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, formData);
        setEditProduct(null);
      } else {
        await API.post("/products", formData);
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        supplier: "",
      });

      refreshProducts();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {editProduct ? "✏ Edit Product" : "➕ Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="supplier"
          placeholder="Supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {editProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "30px auto",
    animation: "fadeIn 0.6s ease",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "linear-gradient(45deg,#4CAF50,#2E7D32)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default AddProduct;
