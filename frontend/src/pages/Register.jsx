import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registered! Please login.");
      window.location.href = "/";
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div style={container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={form}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

const container = { padding: 40 };
const form = { display: "flex", flexDirection: "column", gap: 10 };
