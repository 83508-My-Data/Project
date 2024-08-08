import React from 'react';
import './sidebar.css'; 

const Sidebarp = () => {
  return (
    <div className="sidebar">
        <center>
        <h2 className="sidebar-title"><u>Dashboard</u></h2>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
         <b> <a href="/Tasks"><u>Home</u></a></b>
        </li> 
        <li className="sidebar-menu-item">
          <a href="/AddProject"><u>Add Project</u></a>
        </li>
        

       
        
      </ul>
        </center>
    </div>
  );
};

export default Sidebarp;
