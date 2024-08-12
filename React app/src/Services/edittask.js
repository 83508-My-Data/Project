import axios from "axios";
 async function getTask(id){
    try {
        var response = await axios.get(`https://localhost:7104/editLoad/${id}`)
        return response.data
    } catch (ex) {
        console.log(ex)
    }
}

export default async function edit(id,attachment,priority,taskCategoryId,userId,deadline){
    debugger
    const body = new FormData();
    body.append('editTaskDto.Priority',priority)
    body.append('attachment',attachment)
    body.append('editTaskDto.TaskCategoryId',taskCategoryId)
    body.append('editTaskDto.UserId',userId)
    body.append('editTaskDto.Deadline',deadline)
    try {

        var response = await axios.put(`https://localhost:7104/api/Task/${id}`, body , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },})
        return response
    } catch (ex) {
        console.log(ex)
    }
}

export { getTask }
