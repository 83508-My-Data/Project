import axios from 'axios'
async function register(firstName, lastName, email, password,dob,mobileNo,Address,roleId,deptId)
{
    const body={firstName, lastName, email, password,dob,mobileNo,Address,roleId,deptId}
    console.log(body)
    try {
        const response=await axios.post(`https://localhost:7104/register`,body)
        console.log(response.data)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}
export default register