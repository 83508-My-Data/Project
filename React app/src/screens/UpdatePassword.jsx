import React, { useState } from 'react';
import axios from 'axios'; 
import '../Style/UpdatePassword.css'; 
import Navbar2 from './../component/Navbar2';
import Sidebar from './../component/Sidebar';

export default function UpdatePassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState('');

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const formData = new FormData();
      formData.append('to', email); // Send a single email in form data
      

      await axios.post('https://localhost:7104/email/send-otp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsOtpSent(true);
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  // Handle OTP verification and password update
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      

      const body=
       {email,otp,newPassword}

      const result=await axios.put('https://localhost:7104/updatepass',body);
      setIsOtpVerified(true);
      setError('');
    } catch (err) {
      setError('Failed to verify OTP or update password. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
      <Navbar2/>
      
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm">
            <h1 className="card-title text-center mb-4">Update Password</h1>

            {!isOtpSent ? (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Send OTP</button>
              </form>
            ) : !isOtpVerified ? (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Verify OTP and Update Password</button>
              </form>
            ) : (
              <div>
                <p className="text-success">Password updated successfully!</p>
              </div>
            )}

            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
