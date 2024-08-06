import React from 'react';
import './sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
        <center>
        <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <a href="#home"><u>Home</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#analytics"><u>My Profile</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#settings"><u>My Tasks</u></a>
        </li>
      </ul>
        </center>
    </div>
  );
};

export default Sidebar;
