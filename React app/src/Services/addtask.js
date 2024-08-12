import axios from "axios";

export default async function addTask(Title, Description, Priority, Attachment, TaskCategoryId, ProjectId, UserId, Comment, Deadline){
    
    const body = new FormData();
    body.append('taskDto.Title',Title)
    body.append('taskDto.Description',Description)
    body.append('taskDto.Priority',Priority)
    body.append('attachment',Attachment)
    body.append('taskDto.TaskCategoryId',TaskCategoryId)
    body.append('taskDto.ProjectId',ProjectId)
    body.append('taskDto.UserId',UserId)
    body.append('taskDto.Comment',Comment)
    body.append('taskDto.Deadline',Deadline)

    try {
        var response = await axios.post(`https://localhost:7104/addtask`, body , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        return response

    } catch (ex) {
        console.log(ex)
    }
}