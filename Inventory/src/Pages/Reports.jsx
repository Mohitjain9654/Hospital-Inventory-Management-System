import React, { useEffect, useState } from "react";
import "./Report.css";

const Report = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportsData, setReportsData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5555/inventory");
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item.id,
          item: item.name,
          stock: item.stock,
          usage: item.usage, // Simulated usage
          status: item.stock <= 99? "Low Stock" : "Sufficient",
        }));

        setReportsData(formatted);
      } catch (error) {
        console.error("Failed to fetch reports data:", error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reportsData.filter((report) =>
    report.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="report-container">
      <h2>Inventory Reports</h2>

      <div className="report-actions">
        <input
          type="text"
          placeholder="Search Reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock Left</th>
            <th>Monthly Usage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <tr key={report.id} className={report.status === "Low Stock" ? "low-stock" : ""}>
                <td>{report.item}</td>
                <td>{report.stock}</td>
                <td>{report.usage}</td>
                <td className={report.status === "Low Stock" ? "danger-text" : "safe-text"}>
                  {report.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">No reports found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
