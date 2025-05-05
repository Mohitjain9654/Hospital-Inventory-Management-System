const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5555;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch inventory data
app.get("/inventory", (req, res) => {
  const inventoryPath = path.join(__dirname, "data", "inventory.json"); 

  console.log("Reading inventory from:", inventoryPath); // Logging the path

  fs.readFile(inventoryPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading inventory file:", err);
      return res.status(500).json({ error: "Could not read inventory data" });
    }

    try {
      const inventory = JSON.parse(data);
      console.log("Inventory data:", inventory); // Logging the data
      res.json(inventory);
    } catch (parseErr) {
      console.error("Error parsing inventory JSON:", parseErr);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
