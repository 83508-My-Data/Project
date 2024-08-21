import React, { useState, useEffect } from "react";
import Navbar1 from "../component/Navbar1";
import Sidebare from "../component/Sidebare";
import { GetEmpTeam } from "../Services/MyTeam";
import getAllTasks from "../Services/tasks";
import '../Style/Dashboard.css'; 
import SidebarM from "../component/SidebarM";

function Dashboard() {
    const [teams, setMyTeam] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Fetch data for teams and tasks
    const loadData = async () => {
        try {
            const [teamsResult = [], tasksResult = []] = await Promise.all([
                GetEmpTeam(),
                getAllTasks()
            ]);

            // Check if the results are arrays
            if (!Array.isArray(teamsResult)) {
                console.error('Teams result is not an array:', teamsResult);
                setMyTeam([]);
            } else {
                setMyTeam(teamsResult);
            }

            if (!Array.isArray(tasksResult)) {
                console.error('Tasks result is not an array:', tasksResult);
                setTasks([]);
            } else {
                setTasks(tasksResult);
            }

        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError('Failed to load data. Please try again later.');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const role = sessionStorage.getItem("roleName")

    return (
        <div className="dashboard-container">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    {role == "Employee" && <Sidebare />}
                    {role == "Manager" && <SidebarM />}
                </div>
                <div className="col-10">
                    <h1 className="dashboard-title">Dashboard</h1>
                    {error && <div className="alert alert-error">{error}</div>}
                    
                    {/* Teams Section */}
                    <div className="dashboard-section">
                        <h2 className="section-title">Teams</h2>
                        {teams.length > 0 ? (
                            <div className="table-responsive shadow-lg mb-5 bg-body-tertiary rounded">
                                <table className="table table-striped table-bordered">
                                    <thead className="table-black">
                                        <tr>
                                            <th>Team ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Lead</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teams.map((team) => (
                                            <tr key={team.id}>
                                                <td>{team.id}</td>
                                                <td>{team.name}</td>
                                                <td>{team.description}</td>
                                                <td>{team.lead}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No teams available</p>
                        )}
                    </div>

                    {/* Tasks Section */}
                    <div className="dashboard-section">
                        <h2 className="section-title">Tasks</h2>
                        {tasks.length > 0 ? (
                            <div className="table-responsive shadow-lg mb-5 bg-body-tertiary rounded">
                                <table className="table table-striped table-bordered">
                                    <thead className="table-black">
                                        <tr>
                                            <th>Task ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Priority</th>
                                            <th>Assigned To</th>
                                            <th>Deadline</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task) => (
                                            <tr key={task.id}>
                                                <td>{task.id}</td>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>{task.status}</td>
                                                <td>{task.priority}</td>
                                                <td>{task.assignedTo}</td>
                                                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No tasks available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
