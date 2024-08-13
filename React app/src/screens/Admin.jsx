import React from "react";
import "../Style/Admin.css";
import Navbar1 from '../component/Navbar1'

function Admin() {
  return (
    <div className="container-fluid">
      <Navbar1 />
      <br></br>
      <br></br>
      
      
      <div className="admin-row">
        <h4>Admin Settings</h4>

        <h4>Add Roles</h4>
        <form>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" name="role" placeholder="Enter role" />
          </div>
          <button id="add-role-btn">Add Role</button>
          <button id="view-roles-btn">View Roles</button>
        </form>
        <table>
        <table id="roles-table">
          <thead>
            <tr>
              <th>Role</th>
            </tr>
          </thead>
          <tbody id="roles-tbody">{/* Roles will be added here */}</tbody>
        </table>
        </table>
        <br></br>
        <h4>Task Categories</h4>
        <form>
          <div className="form-group">
            <label htmlFor="task-category">Task Category:</label>
            <input
              type="text"
              id="task-category"
              name="task-category"
              placeholder="Enter task category"
            />
          </div>
          <button id="add-task-category-btn">Add Task Category</button>
        </form>
        <table id="task-categories-table">
          <thead>
            <tr>
              <th>Task Category</th>
            </tr>
          </thead>
          <tbody id="task-categories-tbody">
            {/* Task categories will be added here */}
          </tbody>
        </table>
        <br></br>
        <h4>Departments</h4>
        <form>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter department"
            />
          </div>
          <button id="add-department-btn">Add Department</button>
          <button id="view-departments-btn">View Departments</button>
        </form>
        <table id="departments-table">
          <thead>
            <tr>
              <th>Department</th>
            </tr>
          </thead>
          <tbody id="departments-tbody">
            {/* Departments will be added here */}
          </tbody>
        </table>
        <br></br>
        <h4>Employees</h4>
        <table id="employees-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Task Category</th>
            </tr>
          </thead>
          <tbody id="employees-tbody">
            {/* Employees will be added here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
