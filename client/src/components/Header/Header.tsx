import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <>
      <nav className='nav-container'>
        <div className='nav-container-item nav-left-items'>
          <Link to='/' className='nav-logo-container'>
            LOGO
          </Link>
          <div className='nav-links'>
            <Link to='/' className='nav-link'>
              PROBLEM
            </Link>
            <Link to='/contest' className='nav-link'>
              CONTEST
            </Link>
            <Link to='/discussion' className='nav-link'>
              DISCUSSION
            </Link>
            <Link to='/rank' className='nav-link'>
              RANK
            </Link>
          </div>
        </div>
        <div className='nav-container-item nav-right-items'>
          <Link to='auth' className='nav-icon-user'>
            <FaUserAlt className='nav-logo' />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
