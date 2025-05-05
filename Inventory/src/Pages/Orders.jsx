import React, { useState } from "react";
import "./Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      item: "Surgical Masks",
      quantity: 500,
      supplier: "MediSupply Co.",
      status: "Delivered",
      date: "2025-04-01",
    },
    {
      id: 2,
      item: "IV Fluids",
      quantity: 200,
      supplier: "HealthPharma Ltd.",
      status: "Processing",
      date: "2025-04-08",
    },
    {
      id: 3,
      item: "Gloves (Latex)",
      quantity: 1000,
      supplier: "SafeHands Inc.",
      status: "Pending",
      date: "2025-04-10",
    },
  ]);

  const [form, setForm] = useState({
    item: "",
    quantity: "",
    supplier: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrder = () => {
    if (form.item && form.quantity && form.supplier) {
      const newOrder = {
        ...form,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
      };
      setOrders([newOrder, ...orders]);
      setForm({ item: "", quantity: "", supplier: "", status: "Pending" });
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order Management</h2>

      {/* New Order Form */}
      <div className="orders-card">
        <h3>Place New Order</h3>
        <label>
          Item Name:
          <input
            type="text"
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="Enter item name"
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </label>
        <label>
          Supplier:
          <input
            type="text"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            placeholder="Supplier name"
          />
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
          </select>
        </label>
        <button className="save-btn" onClick={handleAddOrder}>
          Add Order
        </button>
      </div>

      {/* Order Table */}
      <div className="orders-card">
        <h3>All Orders</h3>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.item}</td>
                  <td>{order.quantity}</td>
                  <td>{order.supplier}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
