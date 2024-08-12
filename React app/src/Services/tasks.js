import axios from "axios";
export default async function getAllTasks() {
    try {
        var response = await axios.get("https://localhost:7104/api/Task")
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

async function getAllEmployee(id) {
    try {
        var response = await axios.get(`https://localhost:7104/Manager/User/${id}`)
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

async function getAllProjects(id) {
    try {
        var response = await axios.get(`https://localhost:7104/Manager/Project/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

export { getAllEmployee, getAllProjects, getAllTaskCategory}