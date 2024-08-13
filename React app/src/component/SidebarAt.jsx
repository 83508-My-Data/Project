import React from 'react';
import './sidebar.css'; 

const SidebarAt = () => {
  return (
    <div className="sidebar">
        <center>
        <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <a href="/myProfile"><u>Home</u></a>
        </li>
        
        <li className="sidebar-menu-item">
          <a href="/myteam"><u>My Team</u></a>
        </li>
       
        
      </ul>
        </center>
        
    </div>
  );
};

export default SidebarAt;
