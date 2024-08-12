
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getAllEmployee, getAllTaskCategory } from "../Services/tasks"
import Navbar1 from "../component/Navbar1"
import Sidebar from "../component/Sidebar"
import { getTask } from "../Services/edittask"
import edit from "../Services/edittask"
import { toast } from "react-toastify"

function EditTask(){
    const { id } =useParams()
    const [title, setTitle] = useState('')
    const [attachment, setAttachment] = useState()
    const [priority, setPriority] = useState('')
    const [taskCategoryId, setTaskCategoryId] = useState('')
    const [userId, setUserId] = useState('')
    const [deadline,setDeadline] = useState('')
    const [taskCategorys, setTaskCategorys] = useState([])
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const taskedit = async(e) => {
        e.preventDefault();
        var result = await edit(id,attachment,priority,taskCategoryId,userId,deadline)
        if(result.status){
            toast.success("Task Edited")
            navigate('/tasks')
        }else{
            toast.error("Fail to edit")
        }
    }

    async function taskload(tid) {
        debugger
        var result = await getTask(tid)
        var user = await getAllEmployee()
        var category = await getAllTaskCategory()
        setTitle(result.title)
        setPriority(result.priority)
        setTaskCategoryId(result.taskCategoryId)
        setUserId(result.userId)
        setUsers(user)
        setTaskCategorys(category)
    }

    useEffect(()=>{
        taskload(id);
    },[])


    return (<div className="container-fluid">
            <Navbar1 />
            <br />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col">
                        <div className="container bg-primary bg-opacity-25 shadow mb-5 rounded">
                            <form onSubmit={taskedit}>
                                <div className="row">
                                    <div className="group">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" 
                                        id="title"
                                        name="title"
                                        value={title}
                                        readOnly
                                    />
                                    </div>
                                    <div className="group">
                                    <label className="form-label">Select Attachment File</label>
                                    <input className="form-control" type="file" id="formFile" 
                                        onChange={(e)=> {setAttachment(e.target.files[0])}}
                                    />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="group">
                                    <label className="form-label">Priority</label>
                                    <input type="number" className="form-control" min={1} max={10}  
                                        id="priority"
                                        name="priority"
                                        value={priority}
                                        onChange={(e) => ( setPriority(e.target.value))}
                                    />
                                    </div>
                                    <div className="group">
                                    <label className="form-label">Task Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        className="form-select"
                                        onChange={(e) => setTaskCategoryId(e.target.value)}
                                        value={taskCategoryId}
                                    >
                                    {taskCategorys.map( category => (
                                    <option key='taskCategory' value={category.taskCategoryId}>
                                        {category.taskName}
                                    </option>
                                    ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="group">
                                    <label className="form-label">Employee</label>
                                    <select
                                        id="employee"
                                        name="employee"
                                        className="form-select"
                                        onChange={(e) => setUserId(e.target.value)}
                                        value={userId}
                                    >
                                    {users.map( user => (
                                    <option key='employeeId' value={user.userId}>
                                        {user.firstName+" "+user.lastName}
                                    </option>
                                    ))}
                                    </select>
                                    </div>
                                    <div className="group">
                                    <label className="form-label">Deadline Date</label>
                                    <input type="date" className="form-control" 
                                        id="deadline"
                                        name="deadline"
                                        onChange={(e) => ( setDeadline(e.target.value))}
                                    />
                                    </div>
                                </div><div className="row">
                                    <div className="col">
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary" type="submit">Update Task</button>
                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
    </div>)
}

export default EditTask