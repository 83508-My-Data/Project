import Navbar1 from "../component/Navbar1";
import Sidebarp from '../component/Sidebarp';
import {getProj }from '../Services/project';
import React, { useState, useEffect } from 'react';
import '../Style/Project.css';  


function Project() {
    const [projects, setProjects] = useState([]);

    const proj = async () => {
        try {
            const result = await getProj(1007);
            setProjects(result);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const onEditDetails = (projectId) => {
        
    };

    useEffect(() => {
        proj();
    }, []);

    return (
        <div className="container-fluid">
         
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <Sidebarp />
                </div>
                <div className="col">
                    <div className="table-container">
                        <div className="table-header">
                            <u><h4>Project List</h4></u>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Project Title</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Edit Project</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{project.projectTitle}</td>
                                        <td>{project.startDate}</td>
                                        <td></td>
                                        <td>
                                            <button 
                                                className='btn btn-warning btn-sm'
                                                onClick={() => onEditDetails(project.projectId)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
