import { useState } from "react";
import API from "../api";

function Login({ setIsAuthenticated, setIsLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);

    } catch (error) {
      alert("❌ Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login</h2>

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
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <button onClick={() => setIsLogin(false)} style={linkStyle}>
            Signup
          </button>
        </p>
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

const linkStyle = {
  background: "none",
  border: "none",
  color: "#007bff",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Login;
