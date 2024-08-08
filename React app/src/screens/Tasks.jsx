import { useEffect, useState } from "react";
import Navbar1 from "../component/Navbar1";
import Sidebar from "../component/Sidebar";
import getAllTasks from "../Services/tasks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tasks() {

   const [tasks, setTasks] = useState([])
    async function load(){
        var result = await getAllTasks()
        setTasks(result)
    };

    async function download(id){
        axios.get(`https://localhost:7104/DownloadFile/${id}`).then()
    }
    
    useEffect(()=>{
        load();
    }, [])

    return (
        <div className="container-fluid">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col">
                    <br/>
                    <br/>
                    <br/>
                    <br />
                {tasks.length > 0 && (<div className="table-responsive shadow-lg mb-5 bg-body-tertiary rounded">
                <table className="table table-striped table-bordered table-responsive caption-top">
                <caption className="bg-black"><center><h3 className="text-light">Task List</h3></center></caption>
                <thead className="table-dark">
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Attachment</th>
                        <th>Status</th>
                        <th>Assign Date</th>
                        <th>Priority</th>
                        <th>Category</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody className="table-primary">
                    {tasks.map( (task, index) => (
                        <tr key={index}>
                            <td>{task.taskId}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td><label>{task.attachmentPath}</label>
                                <button className="btn btn-success" onClick={()=>{download(task.taskId)}} >Download</button></td> 
                            <td>{task.status}</td>
                            <td>{task.uploadAt}</td>
                            <td>{task.priority}</td>
                            <td>{task.category.taskName}</td>
                            <td>{task.workingProject.projectTitle}</td>
                            <td>{task.currentUser.firstName +" "+ task.currentUser.lastName}</td>
                            <td>{task.deadline}</td>
                        </tr>
                    ))}
                    
                </tbody>
                </table>

                </div>
                )}</div>
            </div>
        </div>
    );
}

export default Tasks;
