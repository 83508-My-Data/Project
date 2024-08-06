import Navbar from "../component/Navbar";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import login  from '../Services/login'
import { toast } from 'react-toastify'
 

function Login()
{
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isEmailEmpty, setEmailEmpty] = useState(false)
const [isPasswordEmpty, setPasswordEmpty] = useState(false)


const navigate = useNavigate()

const onLogin = async () => {
  if (email.length == 0) {
    toast.error('Please enter email')
  } else if (password.length == 0) {
    toast.error('Please enter password')
  } else {
    
    const result = await login(email, password)
    console.log(result)
    navigate('/Dashboard')
    // if (result['status'] == 'success') {
    //   const data = result['data']

      
    //   sessionStorage['name'] = data['name']
    //   sessionStorage['token'] = data['token']

      
    //   navigate('/properties')
    // } else {
    //   toast.error(result['error'])
    // }
  }
}
    return (
        <div>
            <Navbar></Navbar>
            
            <div className="Login-Box">
  <div className="Login-Head"><h2 className='page-header'>Login</h2></div>
  <div className='row'>
    <div className='col'></div>
    <div className='col'>
      <div className='form'>
        <div className='mb-3'>
          <label htmlFor=''>Email:</label>
          <input
            onChange={(e) => {
              if (e.target.value.length == 0) {
                setEmailEmpty(true)
              } else {
                setEmailEmpty(false)
              }
              setEmail(e.target.value)
            }}
            type='email'
            className='form-control'
          />
          {isEmailEmpty && (
            <p style={{ color: 'red' }}>Email is mandatory</p>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password:</label>
          <input
            onChange={(e) => {
              if (e.target.value.length == 0) {
                setPasswordEmpty(true)
              } else {
                setPasswordEmpty(false)
              }
              setPassword(e.target.value)
            }}
            type='password'
            className='form-control'
          />
          {isPasswordEmpty && (
            <p style={{ color: 'red' }}>Password is mandatory</p>
          )}
        </div>
        <div className='mb-2'>
          <div>
            <center>Don't have account ? <Link to='/Register'>Register here</Link></center>
          </div>
          
        </div>
        
      </div>
      <center> <button onClick={onLogin} className='btn btn-success'>
            Login
          </button></center>
     
    </div>
    <div className='col'></div>
  </div>
</div>
            </div>
        
    )
}
export default Login