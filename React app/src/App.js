 import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './screens/Login'
import AddTask from './screens/AddTask'
import Edittask from './screens/Edittask'
import Dashboard from './screens/Dashboard';
import Tasks from './screens/Tasks';
import Register from './screens/Register';
import Notification from './screens/Notification';
import About from './screens/About';

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
     
      <Route path='' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/register' element={<Register></Register>} />
      <Route path='/tasks' element={<Tasks/>} />
      <Route path='/notification' element={<Notification/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/addtask' element = {<AddTask/>} /> 
      <Route path='/edittask' element = {<Edittask/>} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
