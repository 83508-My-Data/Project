import axios from 'axios'
export default async function GetEmp()
{
    try {
        const id= sessionStorage.getItem("userId")
        const response = await axios.get(`https://localhost:7104/getuserdept/${id}`
        );
        console.log(response.data)
        return response.data;
    } catch (ex) {
        console.error('Exception:', ex);
    }
}
export  async function AddEmpToTeam(empid)
{
    try {
        const mngid= sessionStorage.getItem("userId")
        const body={empid,mngid}
        const response = await axios.post(`https://localhost:7104/addemp`,body
        );
        console.log(response.data)
        return response.data;
    } catch (ex) {
        console.error('Exception:', ex);
    }
}
export  async function GetEmpTeam(mngId)
{
    try {
        const mngId= sessionStorage.getItem("userId")
        
        const response = await axios.get(`https://localhost:7104/getuser/${mngId}`,
        );
        console.log(response.data)
        return response.data;
    } catch (ex) {
        console.error('Exception:', ex);
    }
}