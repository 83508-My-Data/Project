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
          <a href="/myProfile"><u>My Profile</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/employeetask"><u>Tasks</u></a>
        </li>
        
       
       
      </ul>
        </center>
        
    </div>
  );
};

export default Sidebar;
