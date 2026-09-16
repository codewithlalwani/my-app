import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import AuthLayout from "./AuthLayout";
import { signIn } from "../utils/accounts";
import { getCurrentUser } from "../utils/storage";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: location.state?.email || "", password: "" });
  const [error, setError] = useState("");

  if (getCurrentUser()) return <Navigate to="/dashboard" replace />;

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    try {
      signIn(formData.email, formData.password);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setError("");
  };

  return (
    <AuthLayout title="Login" description="Welcome back. Your workspace is waiting.">
      {location.state?.registered && <p className="auth-success" role="status">Your account is ready. Sign in to get started.</p>}
      {error && <p id="login-error" className="auth-error" role="alert">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <label htmlFor="login-email">Email address<input id="login-email" type="email" name="email" placeholder="you@example.com" autoComplete="username" value={formData.email} onChange={handleChange} required aria-describedby={error ? "login-error" : undefined} /></label>
        <label htmlFor="login-password">Password<input id="login-password" type="password" name="password" placeholder="Enter your password" autoComplete="current-password" value={formData.password} onChange={handleChange} required aria-describedby={error ? "login-error" : undefined} /></label>
        <button type="submit" className="auth-submit">Sign in <ArrowForward /></button>
      </form>
      <p className="auth-link">New to the workspace? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}
