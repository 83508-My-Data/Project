 import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './screens/Login'
import AddTask from './screens/AddTask'
import Edittask from './screens/Edittask'
import Dashboard from './screens/Dashboard';
import ManagerTasks from './screens/ManagerTasks';
import Register from './screens/Register';
import Notification from './screens/Notification';
import About from './screens/About';
import EmployeeTasks from './screens/EmployeeTasks'

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
     
      <Route path='' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/register' element={<Register></Register>} />
      <Route path='/managertasks' element={<ManagerTasks/>} />
      <Route path='/notification' element={<Notification/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/addtask' element = {<AddTask/>} /> 
      <Route path='/edittask/:id' element = {<Edittask/>} />
        <Route path='/employeetask' element={<EmployeeTasks />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myProfile' element={<MyProfileFinal />} />
        <Route path='/editProfile/:id' element={<EditProfile />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
