import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjById, updateProj } from '../Services/project';
import Navbar1 from "../component/Navbar1";
import Sidebarp from "../component/Sidebarp";
import '../Style/EditProject.css'; // Import your custom CSS file

const EditProject = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [projectTitle, setProjectTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const result = await getProjById(id);
                if (result) {
                    setProjectTitle(result.projectTitle || '');
                    setStartDate(result.startDate || '');
                    setEndDate(result.endDate || '');
                }
            } catch (error) {
                toast.error('Failed to fetch project details');
                console.error(error);
            }
        };

        fetchProject();
    }, [id]);

    const onSubmitData = async (e) => {
        e.preventDefault(); 
    
        if (projectTitle.length === 0) {
            toast.error('Please enter project title'); 
        } else if (startDate.length === 0) {
            toast.error('Please enter start date');
        } else if (endDate.length === 0) {
            toast.error('Please enter end date');
        } else {
            try {
                const result = await updateProj(id, projectTitle, startDate, endDate);
                
                if (result === "Project details updated") {
                    toast.success("Successfully updated project");
                    navigate("/Project"); 
                } else {
                    toast.error("Project not updated successfully");
                }
            } catch (error) {
                toast.error('An error occurred while updating the project');
                console.error(error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <Sidebarp />
                </div>
                <div className="col" className="formm">
                    <h1 className="text-center mb-4">Edit Project</h1>
                    <div className="form-container">
                        <form onSubmit={onSubmitData}>
                            <div className="form-group">
                                <label htmlFor="projectTitle">Title:</label>
                                <input
                                    type="text"
                                    id="projectTitle"
                                    name="projectTitle"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter project title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter start date"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter end date"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
