import Navbar from "../component/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import login from '../Services/login';
import { toast } from 'react-toastify';
import '../Style/Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const navigate = useNavigate();

  const onLogin = async () => {
    if (email.length === 0) {
      toast.error('Please enter email');
    } else if (password.length === 0) {
      toast.error('Please enter password');
    } else {
      const result = await login(email, password);
      if (result.status) {
        if (result.result.role.roleName === "Manager") {
          const data = result;
          sessionStorage.setItem('userId', data.result.userId);
          sessionStorage.setItem('token', data.result.token);
          navigate('/Tasks');

        } else {
          navigate('/Dashboard');
        }
        toast.success(result.msg);
      } else {
        navigate('/Login');
        toast.error(result.msg);
      }
    }
  };

  return (
    <div className="bckimg">
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center min-vh-100" >
        <div className="login-box shadow-lg p-4 rounded bg-white">
          <h2 className="text-center mb-4">Login</h2>
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className={`form-control ${isEmailEmpty ? 'is-invalid' : ''}`}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailEmpty(e.target.value.length === 0);
              }}
            />
            {isEmailEmpty && <div className="invalid-feedback">Email is mandatory</div>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className={`form-control ${isPasswordEmpty ? 'is-invalid' : ''}`}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordEmpty(e.target.value.length === 0);
              }}
            />
            {isPasswordEmpty && <div className="invalid-feedback">Password is mandatory</div>}
          </div>
          <center>
          <div className="className='mb-2'">
          <div className="textc">
            Don't have account ?<Link to='/Register'>Register here</Link>
          </div>

          </div></center>
          <button onClick={onLogin} className="btn btn-primary w-100">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
