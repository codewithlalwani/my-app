import React from "react";
import { Link } from "react-router-dom";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import "../App.css";

export default function AuthLayout({ title, description, children, registration = false }) {
  return (
    <main className="auth-page">
      <Link to="/" className="auth-brand" aria-label="LRIT home">
        <span className="auth-brand-icon"><AutoAwesomeOutlined /></span>
        <span>LRIT <span>workspace</span></span>
      </Link>
      <div className={`auth-layout${registration ? " auth-registration" : ""}`}>
        <section className="auth-introduction" aria-label="Welcome to LRIT">
          <span className="auth-eyebrow">A LITTLE SPACE. ENDLESS POSSIBILITIES.</span>
          <h2>Less noise.<br />More possibility.</h2>
          <p>Your people, your profile, your own little corner of clarity. All together in one beautiful workspace.</p>
          <div className="auth-art" aria-hidden="true">
            <div className="auth-orbit" />
            <div className="auth-art-card"><PeopleOutline /><span>Better, together.</span><div className="auth-art-avatars"><i /><i /><i /></div></div>
            <div className="auth-art-spark"><AutoAwesomeOutlined /></div>
          </div>
          <span className="auth-footnote">Thoughtfully simple. Beautifully connected.</span>
        </section>
        <section className="auth-card" aria-labelledby="auth-title">
          <span className="auth-card-icon"><AutoAwesomeOutlined /></span>
          <h1 id="auth-title">{title}</h1>
          <p className="auth-description">{description}</p>
          {children}
        </section>
      </div>
      <footer className="auth-footer">LRIT Workspace <span>Your everyday, a little more extraordinary.</span></footer>
    </main>
  );
}
