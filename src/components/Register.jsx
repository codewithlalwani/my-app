import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import AuthLayout from "./AuthLayout";
import { createAccount, passwordHint } from "../utils/accounts";
import { getCurrentUser } from "../utils/storage";

const fields = [
  { name: "name", label: "Full name", autoComplete: "name", placeholder: "Your full name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", placeholder: "you@example.com" },
  { name: "age", label: "Age", type: "number", min: 1, max: 120, step: 1, placeholder: "Your age" },
  { name: "address", label: "Address", autoComplete: "street-address", placeholder: "Your city or address" },
  { name: "password", label: "Password", type: "password", autoComplete: "new-password", placeholder: "Create a password" },
  { name: "confirmPassword", label: "Confirm password", type: "password", autoComplete: "new-password", placeholder: "Repeat your password" },
];

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", age: "", address: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  if (getCurrentUser()) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords don't match. Please try again.");
      return;
    }
    try {
      const user = createAccount(formData, { registration: true });
      navigate("/login", { replace: true, state: { registered: true, email: user.email } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout title="Create account" description="A fresh start, and a space to call your own." registration>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form auth-form-register">
        {fields.map(({ label, ...field }) => (
          <label key={field.name} htmlFor={`register-${field.name}`}>{label}
            <input {...field} id={`register-${field.name}`} type={field.type || "text"} value={formData[field.name]} required onChange={(event) => { setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value })); setError(""); }} aria-describedby={field.name === "password" ? "password-hint" : undefined} />
          </label>
        ))}
        <p id="password-hint" className="auth-password-hint">{passwordHint}</p>
        <button type="submit" className="auth-submit">Create account <ArrowForward /></button>
      </form>
      <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
    </AuthLayout>
  );
}
