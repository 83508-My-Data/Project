import { useEffect, useState } from "react";
import Navbar1 from "../component/Navbar1";
import Sidebar from "../component/Sidebar";
import getAllTasks from "../Services/tasks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tasks() {

   const [tasks, setTasks] = useState([])
   const navigate = useNavigate()
    
   async function load(){
        var result = await getAllTasks()
        setTasks(result)
    };

    async function download(id){
        axios.get(`https://localhost:7104/DownloadFile/${id}`)
    }

    function Add(){
        navigate('/addtask')
    }

    function editTask(id){
        navigate(`/edittask/${id}`)
    }
    
    useEffect(()=>{
        load();
    }, [tasks])

    return (
        <div className="container-fluid">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10">
                    <br />
                    <br />
                    <br />
                    <div className="col-1"><button className="btn btn-danger" onClick={Add}>Add Task</button></div>
                    <br />
                {tasks.length > 0 && (<div className="table-responsive shadow-lg mb-5 bg-body-tertiary rounded">
                <table className="table table-striped table-bordered table-responsive caption-top">
                <caption className="bg-black"><center><h3 className="text-light">Task List</h3></center></caption>
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Task ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Attachment</th>
                        <th scope="col">Status</th>
                        <th scope="col">Assign Date</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Category</th>
                        <th scope="col">Project</th>
                        <th scope="col">Assigned To</th>
                        <th scope="col">Deadline</th>
                        <th scope="col"> Actions</th>
                    </tr>
                </thead>
                <tbody className="table-primary ">
                    {tasks.map( (task, index) => (
                        <tr key={index}>
                            <td >{++index}</td>
                            <td >{task.title}</td>
                            <td >{task.description}</td>
                            <td><label>{task.attachmentPath}</label>
                                <button className="btn btn-success" onClick={()=>{download(task.taskId)}} >Download</button></td> 
                            <td >{task.status}</td>
                            <td >{task.uploadAt}</td>
                            <td >{task.priority}</td>
                            <td >{task.category.taskName}</td>
                            <td >{task.workingProject.projectTitle}</td>
                            <td >{task.currentUser.firstName +" "+ task.currentUser.lastName}</td>
                            <td >{task.deadline}</td>
                            <td><button className="btn btn-primary" onClick={()=>{editTask(task.taskId)}}>Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </td>
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
