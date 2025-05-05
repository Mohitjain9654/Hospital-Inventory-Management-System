import React, { useState } from "react";
import "./Setting.css";
import { FaUserCircle, FaMoon, FaBell, FaLanguage, FaLock, FaTrashAlt } from "react-icons/fa";

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [language, setLanguage] = useState("english");

  const handleThemeToggle = () => setDarkMode(!darkMode);
  const handleNotificationToggle = () => setNotifications(!notifications);
  const handlePrivacyToggle = () => setPrivacyMode(!privacyMode);

  return (
    <div className={`settings-container ${darkMode ? "dark" : ""}`}>
      <h2 className="settings-title">⚙️ Settings</h2>

      {/* Profile Section */}
      <div className="setting-card">
        <h3><FaUserCircle /> Profile Settings</h3>
        <label>
          Name:
          <input type="text" placeholder="Enter your name" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="New password" />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" />
        </label>
        <button className="save-btn">💾 Save Changes</button>
      </div>

      {/* App Preferences */}
      <div className="setting-card">
        <h3><FaMoon /> App Preferences</h3>
        <label className="toggle">
          <input type="checkbox" checked={darkMode} onChange={handleThemeToggle} />
          Enable Dark Mode
        </label>
        <label className="toggle">
          <input type="checkbox" checked={notifications} onChange={handleNotificationToggle} />
          Enable Notifications <FaBell />
        </label>
        <label>
          <FaLanguage /> Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
          </select>
        </label>
      </div>

      {/* Privacy & Danger Zone */}
      <div className="setting-card danger-zone">
        <h3><FaLock /> Privacy</h3>
        <label className="toggle">
          <input type="checkbox" checked={privacyMode} onChange={handlePrivacyToggle} />
          Enable Privacy Mode
        </label>
        <button className="delete-btn">
          <FaTrashAlt /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default Setting;
