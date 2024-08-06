 import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './screens/Login'

import Dashboard from './screens/Dashboard';

import Tasks from './screens/Tasks';
import Register from './screens/Register';

function App() {
  return (
    <div className='container'>
      <Routes>
     
      <Route path='' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/register' element={<Register></Register>} />
      <Route path='/tasks' element={<Tasks/>} />
     
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
