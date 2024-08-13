import axios from "axios";
async function getProfile() {
    try {
        const userId=sessionStorage.getItem("userId");
        const response = await axios.get(`https://localhost:7104/api/Users/${userId}`);
        console.log(response.data)
        return response.data; 
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null; 
    }
};
export default getProfile;
