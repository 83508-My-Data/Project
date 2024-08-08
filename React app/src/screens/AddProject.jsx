import React, { useState } from 'react';
import Navbar1 from "../component/Navbar1";
import Sidebarp from '../component/Sidebarp'; 
import '../Style/Project.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addProject } from '../Services/project';

function AddProject() {
    const [projectTitle, setProjectTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const navigate = useNavigate(); // Correctly initialize useNavigate

    const onAdd = async (e) => {
        e.preventDefault(); 
    
        if (projectTitle.length === 0) {
            toast.error('Please enter project title'); // Fixed typo here
        } else if (startDate.length === 0) {
            toast.error('Please enter start date');
        } else {
            try {
                const result = await addProject(projectTitle, startDate);
                
                if (result=="project Added Successfully") {
                    toast.success("successfully added project");
                    navigate("/Project"); 
                } else {
                    toast.error("Project not added successfully");
                }
            } catch (error) {
                toast.error('An error occurred while adding the project');
                console.error(error);
            }
        }
    };

    return (
        <div className="addproj">
            <div className="container-fluid">
                <Navbar1 />
                <div className="row">
                    <div className="col-2">
                        <Sidebarp />
                    </div>
                    <div className="col">
                        <div className="container mt-4">
                            <div className="form-box">
                                <h1 className="mb-4">Add New Project</h1>
                                <form onSubmit={onAdd}>
                                    <div className="form-group">
                                        <label htmlFor="projectTitle">Project Title</label>
                                        <input
                                            type="text"
                                            id="projectTitle"
                                            name="projectTitle"
                                            onChange={(e) => setProjectTitle(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter project title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="startDate">Start Date</label>
                                        <input
                                           type="date"
                                           id="startDate"
                                           name="startDate"
                                           onChange={(e) => setStartDate(e.target.value)}
                                           className="form-control"
                                           placeholder="Enter start date"
                                           required
                                        />
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary btn-lg">Add Project</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
