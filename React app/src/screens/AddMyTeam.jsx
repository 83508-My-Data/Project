import Navbar1 from "../component/Navbar1";
import GetEmp from "../Services/MyTeam";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Project.css';  
import SidebarAt from './../component/SidebarAt';
import {AddEmpToTeam} from '../Services/MyTeam'
function AddMyTeam() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate(); 

    const AddEmp = async () => {
        try {
            const result = await GetEmp();
            setEmployees(result);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    const onAddEmp = async (empId) => {
        
        const result=await AddEmpToTeam(empId)
        navigate('/myteam')
    };

    useEffect(() => {
        AddEmp();
    }, []);

    return (
        <div className="container-fluid">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <SidebarAt />
                </div>
                <div className="col">
                    <div className="table-container">
                        <div className="table-header">
                            <u><h4>Employee List</h4></u>
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
                                                className='btn btn-success btn-sm'
                                                onClick={() => onAddEmp(employees.userId)}
                                            >
                                                Add to team
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

export default AddMyTeam;
