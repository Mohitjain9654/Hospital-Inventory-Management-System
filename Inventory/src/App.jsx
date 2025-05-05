import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Sidebar from "./Pages/Sidebar";
import Inventory from "./Pages/Inventory";
import Orders from "./Pages/Orders";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import Supplier from "./Pages/Supplier";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Supplier" element={<Supplier />} />
      </Routes>
    </>
  );
}

export default App;
