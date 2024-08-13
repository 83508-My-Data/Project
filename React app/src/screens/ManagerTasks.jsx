import { useEffect, useState } from "react";
import Navbar1 from "../component/Navbar1";
import getAllTasks, { deleteTask, getAllTasksCompleted, getAllTasksPending, getAllTasksUncompleted } from "../Services/tasks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarM from "../component/SidebarM";

function ManagerTasks() {

   const [tasks, setTasks] = useState([])
   const [choice, setChoice] = useState('')
   const navigate = useNavigate()
    
   async function load(){
    if(choice == 3){
        var resultC = await getAllTasksCompleted()
        setTasks(resultC)
    }else if(choice == 2){
        var resultP = await getAllTasksPending()
        setTasks(resultP)
    }else if(choice == 4){
        var resultU = await getAllTasksUncompleted()
        setTasks(resultU)
    }else{
        var result = await getAllTasks()
        setTasks(result)
    }
    };

    async function deleted(id) {
       var result = await deleteTask(id)
       if(result.status){
        toast.success(result.msg)
       }else{
        toast.error(result.msg)
       }
       load()
    }

    async function download(id){
        try {
            // Make a GET request to the download endpoint with dynamic fileId
            const response = await axios.get(`https://localhost:7104/DownloadFile/${id}`, {
              responseType: 'blob', // Set the response type to blob
            });
      
            // Extract filename from Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'file'; // Default filename
      
            if (contentDisposition) {
              // Regex to match both filename and filename* parameters
              const filenameRegex = /filename\*?=(?:UTF-8''|)([^;,\n]*)/;
              const matches = filenameRegex.exec(contentDisposition);
      
              if (matches && matches[1]) {
                filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
              }
            }
      
            // Create a URL for the file and trigger a download
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Use the extracted filename
      
            // Append link to the body, click to trigger download, and then remove it
            document.body.appendChild(link);
            link.click();
      
            // Cleanup
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Error downloading the file:', error);
          }
    }

    function Add(){
        navigate('/addtask')
    }

    function editTask(id){
        navigate(`/edittask/${id}`)
    }
    
    useEffect(()=>{
        load();
    }, [choice])

    return (
        <div className="container-fluid">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <SidebarM />
                </div>
                <div className="col-10">
                    <br />
                    <br />
                    <br />
                    <div className="col">
                        <div className="col-1"><button className="btn btn-danger" onClick={Add}>Add Task</button></div>
                        <div className="col-9"></div>
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
                <thead className="table-black">
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
                        <th scope="col">Assigned To</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Actions</th>
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
                            <td >{(task.status)}
                            </td>
                            <td >{task.uploadAt}</td>
                            <td >{task.priority}</td>
                            <td >{task.category.taskName}</td>
                            <td >{task.workingProject.projectTitle}</td>
                            <td >{task.currentUser.firstName +" "+ task.currentUser.lastName}</td>
                            <td >{task.deadline}</td>
                            <td><button className="btn btn-primary" onClick={()=>{editTask(task.taskId)}}>Edit</button>
                                <button className="btn btn-danger" onClick={() => {deleted(task.taskId)}}>Delete</button>
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

export default ManagerTasks;
