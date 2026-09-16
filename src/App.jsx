// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getCurrentUser } from "./utils/storage";

function HomeRedirect() {
  return <Navigate to={getCurrentUser() ? "/dashboard" : "/login"} replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Dashboard section="users" />} />
        <Route path="/profile" element={<Dashboard section="profile" />} />
        <Route path="/settings" element={<Dashboard section="settings" />} />
        <Route path="/home" element={<HomeRedirect />} />
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
