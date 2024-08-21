import React, { useState, useEffect } from 'react';
import Navbar1 from "../component/Navbar1";
import Sidebare from '../component/Sidebare';
import '../Style/MyprofileFinal.css'; 
import photo from '../images/photo.jpg'
import getProfile from '../Services/myprofileFinal';
import { useNavigate} from 'react-router-dom';
import SidebarM from '../component/SidebarM';

const MyProfileFinal = () => {
   
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchProfile = async () => {
        try {
            const result = await getProfile();
            setProfileData(result);
        } catch (error) {
            setError('An error occurred while fetching the profile data.');
        } finally {
            setLoading(false);
        }
    };
    const EditProfile  = (id) => {
        
        console.log("hello");
        console.log(id)
        navigate(`/editProfile/${id}`)
    };
        


    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const role = sessionStorage.getItem("roleName")

    return (
        <div className="main-container">
            <Navbar1 />
            {role == "Employee" && <Sidebare />}
                    {role == "Manager" && <SidebarM />}
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                            <div className="row g-0">
                                <div
                                    className="col-md-5 gradient-custom text-center text-white"
                                    style={{
                                        backgroundColor: 'orange', 
                                        borderTopLeftRadius: '.5rem',
                                        borderBottomLeftRadius: '.5rem',
                                    }}
                                >
                                    <img
                                        src={photo} 
                                        alt="Avatar"
                                        className="img-fluid my-5"
                                        style={{ width: '200px' }}
                                    />
                                    <h3 style={{color:"darkblue", fontFamily:"serif", fontWeight:"900", fontSize:"40"}}>Name:  {`${profileData?.firstName} ${profileData?.lastName}`}</h3>
                                    <p style={{color:"black"}}>Designation:  {profileData?.role?.roleName}</p>
                                    <i className="far fa-edit mb-5"></i>
                                </div>
                                <div className="col-md-7" style={{ paddingLeft: '40px' }}>
                                    <div className="card-body p-4">
                                        <h4 style={{color:'blue',fontWeight:'800', fontFamily:"sans-serif", fontSize:'30'}}>Information</h4>
                                        <hr className="mt-0 mb-4" />
                                        <div>
                                            <h6>D.O.B.</h6>
                                            <p className="text-muted">{profileData?.dob}</p>
                                        </div>
                                        <div>
                                            <h6>Email</h6>
                                            <p className="text-muted">{profileData?.email}</p>
                                        </div>
                                        <div>
                                            <h6>Phone</h6>
                                            <p className="text-muted">{profileData?.mobileNo}</p>
                                        </div>
                                        <div>
                                            <h6>Address</h6>
                                            <p className="text-muted">{profileData?.address}</p>
                                        </div>
                                        <div>
                                            <button className="bg-info text-white border-0 rounded-pill px-4 py-2 shadow-sm"
                                            onClick={()=> EditProfile(profileData?.userId)}
                                            >
                                            Edit Profile
                                            </button>
                                        </div>
                                        
                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default MyProfileFinal;
