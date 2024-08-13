import { useEffect, useState } from "react";
import Navbar1 from "../component/Navbar1";
import Sidebar from "../component/Sidebar";
import { getAllTasksOfEmployee, getAllTasksOfEmployeeCompleted, getAllTasksOfEmployeePending, getAllTasksOfEmployeeUncompleted, resetStauts, updateStauts } from "../Services/tasks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeTasks() {

    const [tasks, setTasks] = useState([])
    const [choice, setChoice] = useState('')
    const [disable, setDisable] = useState(false)

    async function load() {
        if(choice == 3){
            var resultC = await getAllTasksOfEmployeeCompleted()
            setTasks(resultC)
            setDisable(false)
        }else if(choice == 2){
            var resultP = await getAllTasksOfEmployeePending()
            setTasks(resultP)
            setDisable(false)
        }else if(choice == 4){
            var resultU = await getAllTasksOfEmployeeUncompleted()
            setTasks(resultU)
            setDisable(true)
        }else{
        var result = await getAllTasksOfEmployee()
        setTasks(result)
        setDisable(false)
        }
    }

    async function download(id){
        await axios.get(`https://localhost:7104/DownloadFile/${id}`)
    }

    async function updateStat(id){
        var result = await updateStauts(id)
        if(result != null){
            toast.success("Status Updated")
        }else{
            toast.error("Failed")
        }
    }

    async function resetStat(id) {
        var result = await resetStauts(id)
        if(result != null){
            toast.success("Reset Successful")
        }else{
            toast.error("Failed")
        }
    }

    
    useEffect(()=>{
        load()
    }, [choice])

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
                    <div className="row">
                        <div className="col-5"></div>
                        <div className="col-5"></div>
                        <div className="col-2"> 
                            <label className="form-label">Filter Task</label>
                            <select
                                id="filter"
                                name="filter"
                                className="form-select"
                                onChange={(e) => setChoice(e.target.value)}
                            >
                            <option value="1">All</option>
                            <option value="2">Pending</option>
                            <option value="3">Completed</option>
                            <option value="4">Uncompleted</option>
                            </select>
                        </div>
                    </div>
                    <br />
                {tasks.length > 0 && (<div className="table-responsive shadow-lg mb-5 bg-body-tertiary rounded">
                <table className="table table-striped table-bordered table-responsive caption-top">
                <caption className="bg-black"><center><h3 className="text-light">Task List</h3></center></caption>
                <thead className="table-dark">
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Attachment</th>
                        <th scope="col">Status</th>
                        <th scope="col">Assign Date</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Category</th>
                        <th scope="col">Project</th>
                        <th scope="col">Assigned By</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Update Status</th>
                    </tr>
                </thead>
                <tbody className="table-primary ">
                    {tasks.map( (task, index) => (
                        <tr key={index}>
                            <td >{++index}</td>
                            <td >{task.title}</td>
                            <td >{task.description}</td>
                            <td><label>{task.attachmentPath}</label>
                                <button className="btn btn-success" disabled={disable} onClick={()=>{download(task.taskId)}} >Download</button></td> 
                            <td >{task.status}</td>
                            <td >{task.uploadAt}</td>
                            <td >{task.priority}</td>
                            <td >{task.category.taskName}</td>
                            <td >{task.workingProject.projectTitle}</td>
                            <td >{task.currentUser.manager.firstName +" "+ task.currentUser.manager.lastName}</td>
                            <td >{task.deadline}</td>
                            <td>{!task.status && <button className="btn btn-primary" disabled={disable} onClick={()=>{updateStat(task.taskId)}}>Completed</button>}
                            {task.status && <button className="btn btn-danger" disabled={disable} onClick={()=>{resetStat(task.taskId)}}>Reset</button>}
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

export default EmployeeTasks;
