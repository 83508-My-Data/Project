import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/RegistrationForm.css'; 
import Navbar2 from '../component/Navbar2';

import { toast } from 'react-toastify';
import register from '../Services/register';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [departments, setDepartments] = useState([]); 
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Added for department selection
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7104/api/Department')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const onRegister = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (firstName.length === 0) {
      toast.error('Please enter first name');
    } else if (lastName.length === 0) {
      toast.error('Please enter last name');
    } else if (email.length === 0) {
      toast.error('Please enter email');
    } else if (password.length === 0) {
      toast.error('Please enter password');
    } else if (confirmPassword.length === 0) {
      toast.error('Please confirm the password');
    } else if (password !== confirmPassword) {
      toast.error('Password does not match');
    } else if (dob.length === 0) {
      toast.error('Please enter date of birth');
    } else if (mobile.length === 0) {
      toast.error('Please enter mobile');
    } else if (address.length === 0) {
      toast.error('Please enter address');
    } else if (role.length === 0) {
      toast.error('Please enter role');
    } else if (!selectedDepartment) { // Check if a department is selected
      toast.error('Please select a department');
    } else {

        var roleid = parseInt(role)
        var deptid = parseFloat(selectedDepartment)
        const result=await register(firstName, lastName, email, password, dob, mobile, address, roleid, deptid);
        
        if(result.status){
          toast.success(result.msg);
          navigate('/login'); 
        }
        else{
          toast.error(result.msg);
        }
        
    }
  };

  return (
    <div >
      <Navbar2 />
      <br/>
      <br/>
      <div id="bckimg">
        <div className="container mt-5">
          <div className="heading-container">
            <h1>Registration Form</h1>
          </div>
          <div className="card shadow-sm bg-white p-4">
            <form onSubmit={onRegister}> {/* Prevent default form submission */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    className="form-control"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {/* <option value="1">Manager</option> */}
                    <option value="2">Employee</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    className="form-control"
                    onChange={(e) => setSelectedDepartment(e.target.value)} // Update selected department
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.departmentId} value={dept.departmentId}>
                        {dept.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
                
              </div>
              
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
