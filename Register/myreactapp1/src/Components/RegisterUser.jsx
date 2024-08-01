import "../Style/Register.css";
import React, { useState } from "react";
function RegisterUser()
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [dob, setDob] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", { 
            firstName, 
            lastName, 
            email, 
            password, 
            mobileNo, 
            dob, 
            role, 
            department, 
            address 
        });
    };

    return (
        <>
            <p className="title">Registration Form</p>

            <form className="App" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr className="form-group">
                            <td><label htmlFor="firstName">First Name:</label></td>
                            <td>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your first name"
                                />
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="lastName">Last Name:</label></td>
                            <td>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="email">Email:</label></td>
                            <td>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="password">Password:</label></td>
                            <td>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="mobileNo">Mobile No.:</label></td>
                            <td>
                                <input
                                    id="mobileNo"
                                    type="text"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    placeholder="Enter your mobile number"
                                />
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="dob">D.O.B:</label></td>
                            <td>
                                <input
                                    id="dob"
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="role">Role:</label></td>
                            <td>
                                {/* <input
                                    id="role"
                                    type=""
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Enter your role"
                                /> */}
                            <select style={{ width: '300px', height:'35px' }}>

                                    <option>Manager</option>
                                    <option>Employee</option>

                                </select>
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="department">Department:</label></td>
                            <td>
                            <select style={{ width: '300px', height:'35px' }}>
                            <option>RND</option>
                                    <option>Employee</option>

                                </select>
                            </td>
                        </tr>
                        <tr className="form-group">
                            <td><label htmlFor="address">Address:</label></td>
                            <td>
                                <input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your address"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit">
                                    Register
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}
export default RegisterUser;