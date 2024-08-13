import React, { useState } from 'react';
import Navbar1 from '../component/Navbar1'
import Sidebar from '../component/Sidebar'
import '../Style/Notification.css';
import getNotify from '../Services/notification'
import { useEffect } from 'react';


  
  function Notification() {
    const [notifications, setNotifications] = useState([]);
  
    const handleRemove = (id) => {
      setNotifications(notifications.filter(notification => notification.id !== id));
    };
    const getNotification= async ()=>
    {
      const result=await getNotify()
      console.log(result)
      setNotifications(result)
    }
    useEffect(()=>
    {
      getNotification()
    },[])
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
                  onClick={() => handleRemove(notification.notificationId)}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{notification.notificationText}</h5>
                    
                  </div>
              <p className="mb-1">Time: {notification.createdOn}</p>
                  <small className="text-body-secondary"></small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Notification;