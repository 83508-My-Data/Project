import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMt from '../component/SideBarMt';
import Navbar1 from '../component/Navbar1';
import {GetEmpTeam} from '../Services/MyTeam'
function MyTeam()
{
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate(); 
    const GetEmpList= async ()=>
    {
        const result=await GetEmpTeam();
        console.log(result)
        setEmployees(result)
    }
    useEffect(()=>
    {
        GetEmpList();
    },[])
    const addTask=()=>
    {
        navigate('/addtask')
    }
    return (
        <div className="container-fluid">
            <Navbar1></Navbar1>
            <div className="row">
                <div className="col-2">
                    <SidebarMt />
                </div>
                <div className="col">
                    <div className="table-container">
                        <div className="table-header">
                            <u><h4>My Team</h4></u>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>DeptId</th>
                                    <th>Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.deptId}</td>
                                        <td>
                                            <button 
                                                className='btn btn-warning btn-sm'
                                                onClick={() => addTask(employees.userId)}
                                            >
                                                Assign Task
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
        </div>
    );
}
export default MyTeam;