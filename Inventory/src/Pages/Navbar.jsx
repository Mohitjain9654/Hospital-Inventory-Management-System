import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>🏥 Hospital Inventory</h2>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/Inventory">Inventory</a>
        <a href="/Reports">Reports</a>
        <a href="/Settings">Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
