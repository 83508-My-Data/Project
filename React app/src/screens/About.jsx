import React from 'react';
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar';
import '../Style/About.css'



const About = () => {
  return (
    <>
    <div className='container-fluid'>
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <div className='bgcolor-blue'>
            <div className="about-us-container">
              <h1 className="about-us-heading">About Us</h1>
            </div>

            <div className="cards-container">
              <div className="card">
                <img src="./people.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">At Task Buddy, we believe that productivity should be simple and enjoyable. Our mission is
                    to provide a user-friendly platform that helps individuals and teams manage tasks effectively,
                    ensuring everyone stays organized and on track.</p>
                </div>
              </div>

              <div className="card">
          
                <div className="card-body">
                  <p className="card-text">With Task Buddy, collaboration is seamless. You can easily share tasks, assign
                    responsibilities, and track progress, ensuring everyone is on the same page.</p>
                </div>
              </div>

              <div className="card">
                         <div className="card-body">
                  <p className="card-text">Task Buddy intelligently divides tasks among users, optimizing workload distribution and
                    ensuring everyone's skills are utilized efficiently.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default About;
