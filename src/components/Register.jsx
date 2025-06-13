// src/components/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../down.avif";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    age: "",
    address: "",
    password: "",
    confirmPassword: "",
    rollID : "",
    // token: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateUniqueId = () => {
    const lastUser = users[users.length - 1];
    return lastUser ? lastUser.id + 1 : 1;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const saveData = () => {
    const { name, email, age, address, password, confirmPassword } = formData;

    if (!name || !email || !age || !address || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long, include a capital letter and a special character.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const isEmailRegistered = users.some((user) => user.email === email);
    if (isEmailRegistered) {
      alert("Email is already registered.");
      return;
    }

    const newUser = {
      id: generateUniqueId(),
      name,
      email,
      age,
      address,
      password,
      rollID : 1,
      // token: 1,
    };

    // // Optional: Only set these if this is the "admin register"
    // localStorage.setItem("rollId", JSON.stringify(1));
    // localStorage.setItem("token", JSON.stringify(1));

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    alert("Registration successful. Redirecting to login...");
    navigate("/login");
  };

  return (
    <div
      className="form-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <div className="register-box">
        <h1 className="register-title">Create Account</h1>
        {["name", "email", "age", "address", "password", "confirmPassword"].map(
          (field, idx) => (
            <div key={idx} className="input-group">
              <input
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : field === "age"
                    ? "number"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={formData[field]}
                onChange={handleChange}
                required
                className="input-control"
              />
            </div>
          )
        )}
        <button onClick={saveData} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
