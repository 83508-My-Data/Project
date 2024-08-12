import React, { useState, useEffect } from 'react';
import Navbar1 from "../component/Navbar1";
import Sidebar from '../component/Sidebar';
import axios from 'axios';

const EditProfileFinal = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        address: '',
        mobileNo: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('https://localhost:7104/api/Users/14'); 
                if (response.status === 200) {
                    setProfileData(response.data);
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } catch (err) {
                console.error('Error fetching profile data:', err.response ? err.response.data : err.message);
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('https://localhost:7104/api/Users/14', profileData);
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Sidebar />
            <Navbar1 />
            <div className="container py-5" style={{ marginTop: '100px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">D.O.B.</label>
                        <input
                            type="text"
                            id="dob"
                            name="dob"
                            value={profileData.dob}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            value={profileData.mobileNo}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileFinal;
