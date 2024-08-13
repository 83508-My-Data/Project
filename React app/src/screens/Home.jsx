import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/Navbar";
import '../Style/Home.css';

const Home = () => {
    const navigate = useNavigate(); 

    const goToLogin = () => {
        navigate("/login"); 
    };
    const goToAbout = () => {
        navigate("/about"); 
    };
 
    return (
        <div className="home-container-fluid">
            <Navbar />
            <div>
            <hr />
                <h1>
                    <span className="orange-text">Stay ahead</span> of your schedule with our
                </h1>
                <h1>task management app</h1>
                <hr />
                <h3>
                    The all in one task management app designed to help you organise,
                </h3>
                <h3>
                    Priortize and Achieve your goals effortlessly...
                </h3>

                <button onClick={goToLogin}>Get Started</button>
                <button onClick={goToAbout}>Know More</button>
                
            </div>
        </div>
    );
};

export default Home;
