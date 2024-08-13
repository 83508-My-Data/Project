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
import EmployeeTasks from './screens/EmployeeTasks';
import Home from './screens/Home';
import Contact from './screens/Contact';
import MyProfileFinal from './screens/MyPofileFinal';
import EditProfile from './screens/EditProfile';
import Project from './screens/Project';
import AddProject from './screens/AddProject';
import EditProject from './screens/EditProject';
import MyTeam from './screens/MyTeam';
import FileDownloadButton from './screens/Download';
import AddMyTeam from './screens/AddMyTeam';
import UpdatePassword from './screens/UpdatePassword';
import Tasks from './screens/Tasks'


function App() {
  return (
    <div className='container-fluid'>
      <Routes>
     
      <Route path='/' element={<Home/>} />
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
      <Route path='/project' element={<Project></Project>}/>
      <Route path='/addproject' element={<AddProject></AddProject>}/>
      <Route path='/editproject/:id' element={<EditProject></EditProject>}/>
      <Route path='/download' element={<FileDownloadButton></FileDownloadButton>}/>
      <Route path='/myteam' element={<MyTeam></MyTeam>}/>
      <Route path='/addteam' element={<AddMyTeam></AddMyTeam>}/>
      <Route path='/updatepass' element={<UpdatePassword />}/>
      <Route path='/tasks' element={<Tasks/>}/>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
