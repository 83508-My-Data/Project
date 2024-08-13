import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: '#6EACDA', width: '100%', margin: '0' }}
      data-bs-theme='light'
    >
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <b>TaskBuddy</b>
        </a>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                to='/home'
                className='nav-link'
                aria-current='page'
              >
                <b><u>Home</u></b>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-link'
                aria-current='page'
              >
                <b><u>About</u></b>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact'
                className='nav-link'
                aria-current='page'
              >
                <b><u>Contact</u></b>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/register'
                className='nav-link'
                aria-current='page'
              >
                <b><u>Register</u></b>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-link'
                aria-current='page'
              >
                <b><u>Login</u></b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
