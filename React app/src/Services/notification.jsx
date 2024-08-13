import axios from 'axios'
export default async function getNotification()
{
    
    try {
        var userId=sessionStorage.getItem("userId")
    const response =await axios.get(`https://localhost:7104/getnotify/${userId}`)
    
    return response.data
        
       
    } catch (ex) {
        console.error('Exception:', ex);
    }

}