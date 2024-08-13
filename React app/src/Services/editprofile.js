import axios from 'axios';

async function editProfile(userId, firstName, lastName, role, email, address) {
    const body = {
        firstName,
        lastName,
        role,
        email,
        address
    };
    const userId=sessionStorage.getItem("userId");

    try {
        const response = await axios.put(`https://localhost:7104/api/Users/${userId}`, body);
        return response.data;
    } catch (ex) {
        // Log the error and rethrow or handle it
        console.error('Exception:', ex.response ? ex.response.data : ex.message);
        throw new Error('An error occurred while updating the profile.');
    }
}

export default editProfile;
