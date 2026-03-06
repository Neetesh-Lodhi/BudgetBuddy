import { useState } from "react";
import API from "../api";

function Signup({ setIsLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);

      alert("Registration successful! Please login.");

      // clear form
      setForm({
        username: "",
        email: "",
        password: "",
      });

      // redirect to login
      setIsLogin(true);
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("❌ Registration failed");
      }
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#4facfe,#00f2fe)",
};

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "10px",
  width: "340px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  width: "100%",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

export default Signup;
