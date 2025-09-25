import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - in a real app, this would come from state or API
  const stats = [
    { label: "Last to 8,000 groups", value: 0, subtext: "TALLE DEVIL #" },
    { label: "LISTED 8,000 GROUPS", value: 6 },
    { label: "REQUISITED 8,000 GROUP", value: 9, subtext: "TALLE DEVIL #" },
    { label: "TOTAL GARES", value: 0, subtext: "TALLE DEVIL #" }
  ];

  const menuItems = [
    "Blood Group",
    "Donor List",
    "Manage Constituit Query",
    "Manage Pages",
    "Update Contact Info",
    "Request Received By Donor"
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">BloodBank & Donor Management System</h1>
        <h2>Dashboard</h2>
      </header>
      
      <nav className="dashboard-menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item" onClick={() => console.log(item)}>
            {item}
          </div>
        ))}
      </nav>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            {stat.subtext && <div className="stat-subtext">{stat.subtext}</div>}
          </div>
        ))}
      </div>
      
      <div className="divider"></div>
      
      <section className="request-section">
        <h3 className="section-title">TOTAL BLOOD REQUEST RECEIVED</h3>
        <div className="stat-value">0</div>
        <div className="stat-subtext">TALLE DEVIL #</div>
      </section>
    </div>
  );
};

export default Dashboard;