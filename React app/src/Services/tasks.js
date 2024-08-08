import axios from "axios";
export default async function getAllTasks() {
    try {
        var response = await axios.get("https://localhost:7104/api/Task")
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}