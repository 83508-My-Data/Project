import axios from 'axios';



async function getProj() {
    try {
        var managerId=sessionStorage.getItem("userId")
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`https://localhost:7104/getproj/${managerId}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (ex) {
        console.error('Exception:', ex);
    }
}
async function addProject(projectTitle,startDate)
{   var managerId=sessionStorage.getItem("userId")
    var endDate=startDate

    const body={projectTitle,startDate,endDate,managerId}
    try {
        const response=await axios.post(`https://localhost:7104/api/Project`,body)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }

}
export const getProjById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`https://localhost:7104/api/Project/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};


export const updateProj = async (id,projectTitle, startDate,endDate) => {
    try {
        const body={projectTitle, startDate,endDate}
        const response = await axios.put(`https://localhost:7104/api/Project/${id}`, body);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};
export  {getProj,addProject};

