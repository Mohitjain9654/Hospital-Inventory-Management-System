import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", category: "" });

  // Fetch inventory from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5555/inventory"); // replace with your backend URL
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.category) {
      alert("Please fill all fields");
      return;
    }

    const updatedInventory = [
      ...inventory,
      {
        id: inventory.length + 1,
        name: newItem.name,
        quantity: parseInt(newItem.quantity),
        category: newItem.category,
        status: parseInt(newItem.quantity) < 5 ? "Low Stock" : "In Stock",
      },
    ];

    setInventory(updatedInventory);
    setNewItem({ name: "", quantity: "", category: "" });
  };

  const handleRemoveItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>

      <div className="inventory-actions">
        <input
          type="text"
          placeholder="Search Inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <button className="add-btn" onClick={handleAddItem}>
          ➕ Add Item
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <tr
                key={item.id}
                className={item.status === "Low Stock" || item.status === "Critical" ? "low-stock" : ""}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
