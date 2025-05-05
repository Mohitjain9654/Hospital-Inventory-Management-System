import React, { useState } from "react";
import "./Supplier.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "MediSupply Co.",
      contact: "medisupply@example.com",
      phone: "9876543210",
      address: "123 Health Street, Mumbai",
    },
    {
      id: 2,
      name: "HealthPharma Ltd.",
      contact: "support@healthpharma.in",
      phone: "9123456789",
      address: "99 Wellness Rd, Delhi",
    },
    {
      id: 3,
      name: "SafeHands Inc.",
      contact: "sales@safehands.com",
      phone: "9988776655",
      address: "45 Safety Lane, Bangalore",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = () => {
    if (form.name && form.contact && form.phone && form.address) {
      const newSupplier = {
        ...form,
        id: Date.now(),
      };
      setSuppliers([newSupplier, ...suppliers]);
      setForm({ name: "", contact: "", phone: "", address: "" });
    }
  };

  return (
    <div className="suppliers-container">
      <h2 className="suppliers-title">Supplier Management</h2>

      {/* New Supplier Form */}
      <div className="suppliers-card">
        <h3>Add New Supplier</h3>
        <label>
          Supplier Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter supplier name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter full address"
          />
        </label>
        <button className="save-btn" onClick={handleAddSupplier}>
          Add Supplier
        </button>
      </div>

      {/* Suppliers Table */}
      <div className="suppliers-card">
        <h3>All Suppliers</h3>
        {suppliers.length === 0 ? (
          <p>No suppliers added yet.</p>
        ) : (
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
