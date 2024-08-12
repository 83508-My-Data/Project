import { useEffect, useState } from "react"
import Navbar1 from "../component/Navbar1"
import Sidebar from "../component/Sidebar"
import { getAllEmployee, getAllProjects, getAllTaskCategory } from "../Services/tasks"
import { toast } from "react-toastify"
import addTask from "../Services/addtask"
import { useNavigate } from "react-router-dom"


function AddTask(){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(0)
    const [taskCategorys, setTaskCategorys] = useState([])
    const [taskCategoryId, setTaskCategoryId] = useState('')
    const [projects, setProjects] = useState([])
    const [projectId, setProjectId] = useState('')
    const [users, setUsers] = useState([])
    const [employeeId, setEmployeeId] = useState('')
    const [comment, setComment] = useState('')
    const [deadline, setDeadline] = useState('')
    const [attachment, setAttachment] = useState(undefined)

    const navigate = useNavigate()

const onAddTask= async (e) => {
    e.preventDefault();
    debugger
    if(title.length === 0){
        toast.error("Please eneter Title")
    }else if(priority === ""){
        toast.error("Please select priority")
    }else if(description.length === 0){
        toast.error("Please enter description")
    }else if(!attachment){
        toast.error("Please enter Deadline Date")
    }else if(!taskCategoryId){
        toast.error("Please select Task Category")
    }else if(!projectId){
        toast.error("Please select Project")
    }else if(!employeeId){
        toast.error("Please select Employee")
    }else if(comment.length === 0){
        toast.error("Please enter Comment ")
    }else if(deadline.length === ''){
        toast.error("Please enter Deadline Date")
    }else{
        var userId = parseInt(employeeId)
        var projId = parseInt(projectId)
        var priorityNum = parseInt(priority)
        var categoryId = parseInt(taskCategoryId)
        debugger
        var result = await addTask(title, description, priorityNum, attachment, categoryId, projId, userId, comment, deadline)

        if(result.status == 200){
            navigate('/Tasks')
            toast.success("Task Added Sucessfully")
        }
        else{
            navigate('/Dashboard')
            toast.error('Something went wrong')
        }
    }
}

async function load(){
    var user = await getAllEmployee()
    var category = await getAllTaskCategory()
    var project = await getAllProjects()
    setUsers(user)
    setTaskCategorys(category)
    setProjects(project)
}

useEffect(()=>{
    load();
},[])

return <div className="container-fluid">
        <Navbar1 />
        <div className="row">
            <div className="col-2">
                <Sidebar/>
            </div>
            <div className="col">
                <br />
                <br />
                <br />
                <div className="btn btn-info"><h2>Assign Task</h2></div>
                <div>
                <form className="form-control text-black bg-primary bg-opacity-25 shadow mb-5 rounded" onSubmit={onAddTask}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" 
                                id="title"
                                name="title"
                                onChange={(e) => ( setTitle(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Priority</label>
                            <input type="number" className="form-control" min={1} max={10}  
                                id="priority"
                                name="priority"
                                onChange={(e) => ( setPriority(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" 
                                id="description"
                                name="description"
                                onChange={(e) => ( setDescription(e.target.value))}
                            />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Task Category</label>
                            <select
                                id="category"
                                name="category"
                                className="form-select"
                                onChange={(e) => setTaskCategoryId(e.target.value)}
                            >
                            <option value="">Select Category</option>
                            {taskCategorys.map( category => (
                            <option key='taskCategory' value={category.taskCategoryId}>
                                {category.taskName}
                            </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Project</label>
                            <select
                                id="project"
                                name="project"
                                className="form-select"
                                onChange={(e) => setProjectId(e.target.value)}
                            >
                            <option value="">Select Project</option>
                            {projects.map( project => (
                            <option key='projectId' value={project.id}>
                                {project.projectTitle}
                            </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Select Attachment File</label>
                            <input className="form-control" type="file" id="formFile" 
                                onChange={(e)=> {setAttachment(e.target.files[0])}}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Employee</label>
                            <select
                                id="employee"
                                name="employee"
                                className="form-select"
                                onChange={(e) => setEmployeeId(e.target.value)}
                            >
                            <option value="">Select Employee</option>
                            {users.map( user => (
                            <option key='employeeId' value={user.userId}>
                                {user.firstName+" "+user.lastName}
                            </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Deadline Date</label>
                            <input type="date" className="form-control" 
                                id="deadline"
                                name="deadline"
                                onChange={(e) => ( setDeadline(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Comment</label>
                            <input type="text" className="form-control" 
                                id="comment"
                                name="comment"
                                onChange={(e) => ( setComment(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="form-row ">
                            <div className="form-group"></div>
                            <div className="form-group"><button type="submit" className="btn btn-primary" >Upload Task</button></div>
                            <div className="form-group"></div>
                    </div>
                </form>
                </div>
            </div>
        </div>
</div>

}

export default AddTask