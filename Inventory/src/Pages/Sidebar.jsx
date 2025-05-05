import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/inventory" onClick={toggleSidebar}>Inventory</Link>
        <Link to="/reports" onClick={toggleSidebar}>Reports</Link>
        <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
      </div>
    </>
  );
}
