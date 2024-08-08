import React from 'react';
import './sidebar.css'; 

const Sidebart = () => {
  return (
    <div className="sidebar">
        <center>
        <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <a href="#home"><u>Home</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#analytics"><u>Add Task</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#settings"><u>Edit Task</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#settings"><u>Completed Task</u></a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#settings"><u>Pending Task</u></a>
        </li>
        
      </ul>
        </center>
    </div>
  );
};

export default Sidebart;
