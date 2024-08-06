import axios from 'axios'
async function login(email,password)
{
    const body={email,password}
    try {
        const response=await axios.post(`https://localhost:7104/login`,body)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}

export default login;