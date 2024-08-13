import axios from "axios";
export default async function getAllTasks() {
    try {
        var response = await axios.get("https://localhost:7104/api/Task")
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksOfEmployeeCompleted() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/completedtask/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksCompleted() {
    try {
        var response = await axios.get(`https://localhost:7104/completedtask`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksOfEmployeePending() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/pendingtask/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksPending() {
    try {
        var response = await axios.get(`https://localhost:7104/pendingtask`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksOfEmployee() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/api/Task/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllEmployee() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/getuser/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTaskCategory() {
    try {
        var response = await axios.get(`https://localhost:7104/api/TaskCategory`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksUncompleted() {
    try {
        var response = await axios.get(`https://localhost:7104/uncompletedtask`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllTasksOfEmployeeUncompleted() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/uncompletedtask/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllProjects() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/getproj/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function updateStauts(id) {
    try {
        var response =await axios.put(`https://localhost:7104/status/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function resetStauts(id) {
    try {
        var response =await axios.put(`https://localhost:7104/status/reset/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function deleteTask(id) {
    try {
        debugger
        var response = await axios.delete(`https://localhost:7104/api/Task/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

export { getAllEmployee, getAllProjects, getAllTaskCategory, getAllTasksOfEmployee ,
      updateStauts, resetStauts, getAllTasksOfEmployeeCompleted, getAllTasksOfEmployeePending,
      getAllTasksCompleted, getAllTasksPending , getAllTasksOfEmployeeUncompleted ,
      getAllTasksUncompleted ,deleteTask}