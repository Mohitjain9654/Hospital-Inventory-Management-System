import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import "./Home.css";

const Home = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStock: 0,
    criticalStock: 0,
    expiringSoon: 0,
    recentOrders: 0,
  });

  const [activity, setActivity] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]); // Store for listing

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("http://localhost:5555/inventory");
        const data = await res.json();

        const totalItems = data.length;

        // Categorize stock levels
        const criticalStockItems = data.filter((item) => item.stock <= 99);
        const lowStockRangeItems = data.filter((item) => item.stock > 5 && item.stock <= 99);

        const allLowStockItems = [...criticalStockItems, ...lowStockRangeItems];
        setLowStockItems(allLowStockItems); // Store for listing

        const lowStock = allLowStockItems.length;
        const criticalStock = criticalStockItems.length;

        // Expiring Soon (next 30 days, not already expired)
        const expiringSoonItems = data.filter((item) => {
          const expiryDate = dayjs(item.expiry);
          const today = dayjs();
          const thirtyDaysFromNow = today.add(30, 'day');
          return expiryDate.isAfter(today) && expiryDate.isBefore(thirtyDaysFromNow);
        });
        const expiringSoon = expiringSoonItems.length;

        // Activity Log
        const activityLog = [];

        criticalStockItems.forEach((item) =>
          activityLog.push(`🔴 CRITICAL: "${item.name}" very low stock (${item.stock} left)`)
        );

        lowStockRangeItems.forEach((item) =>
          activityLog.push(`🟠 Low stock: "${item.name}" only ${item.stock} left`)
        );

        data
          .filter((item) => item.stock > 50)
          .slice(0, 2)
          .forEach((item) =>
            activityLog.push(`🟢 Item "${item.name}" restocked (${item.stock} units)`)
          );

        setStats({
          totalItems,
          lowStock,
          criticalStock,
          expiringSoon,
          recentOrders: Math.floor(Math.random() * 20),
        });

        setActivity(activityLog);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      }
    };

    fetchInventory();
    const interval = setInterval(fetchInventory, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <main className="dashboard">
        <h2>Welcome to Hospital Inventory</h2>
        
        <div className="stats">
          <div className="stat-card">
            <h3>Total Items</h3>
            <p>{stats.totalItems}</p>
          </div>

          <div className="stat-card alert">
            <h3>Low Stock Alerts</h3>
            <p className={stats.criticalStock > 0 ? "alert-text" : ""}>
              {stats.lowStock} Items ({stats.criticalStock} Critical)
            </p>
          </div>

          <div className="stat-card">
            <h3>Expiring Soon</h3>
            <p>{stats.expiringSoon} Medicines</p>
          </div>
        </div>

        <h3>Quick Access</h3>
        <div className="quick-access">
          <Link to="/Inventory"><button className="btn manage">Manage Inventory</button></Link>
          <Link to="/orders"><button className="btn manage">Orders</button></Link>
          <Link to="/Supplier"><button className="btn manage">Suppliers</button></Link>
          <Link to="/Reports"><button className="btn manage">Reports</button></Link>
          <Link to="/Settings"><button className="btn manage">Settings</button></Link>
        </div>

        <section className="recent-activity">
          <h3>Recent Activity</h3>
          {activity.length > 0 ? (
            activity.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>No recent activity</p>
          )}
        </section>

        {lowStockItems.length > 0 && (
          <section className="low-stock-list">
            <h4>🛑 Low Stock Medicines:</h4>
            <ul>
              {lowStockItems.map((item, index) => (
                <li key={index}>
                  {item.name} — {item.stock} units left
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
