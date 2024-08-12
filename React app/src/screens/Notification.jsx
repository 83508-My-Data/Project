import React, { useState } from 'react';
import Navbar1 from '../component/Navbar1'
import Sidebar from '../component/Sidebar'
import '../Style/Notification.css';


const initialNotifications = [
    { id: 1, message: "Notification 1", time: "3 days ago", content: "Some placeholder content in a paragraph.", smallPrint: "And some small print." },
    { id: 2, message: "Notification 2", time: "2 days ago", content: "Some other placeholder content in a paragraph.", smallPrint: "And some muted small print." },
    { id: 3, message: "Notification 3", time: "1 day ago", content: "Additional placeholder content in a paragraph.", smallPrint: "And more small print." },
  ];
  
  function Notification() {
    const [notifications, setNotifications] = useState(initialNotifications);
  
    const handleRemove = (id) => {
      setNotifications(notifications.filter(notification => notification.id !== id));
    };
  
    return (
      <div className="app-container">
        <Navbar1 />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <div className="list-group">
              {notifications.map((notification) => (
                <a
                  key={notification.id}
                  href="#"
                  className="list-group-item list-group-item-action"
                  onClick={() => handleRemove(notification.id)}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{notification.message}</h5>
                    <small className="text-body-secondary">{notification.time}</small>
                  </div>
                  <p className="mb-1">{notification.content}</p>
                  <small className="text-body-secondary">{notification.smallPrint}</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Notification;