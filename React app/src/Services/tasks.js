import axios from "axios";
export default async function getAllTasks() {
    try {
        var response = await axios.get("https://localhost:7104/api/Task")
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

async function getAllProjects() {
    try {
        const id= sessionStorage.getItem("userId")
        var response = await axios.get(`https://localhost:7104/getproj/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

export { getAllEmployee, getAllProjects, getAllTaskCategory}