import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-item copyright'>
        Copyright &copy; 2023 BK-Mathgorithm
      </div>
      <div className='footer-item nav-links'>
        <Link to='/' className='nav-link'>
          Contact us
        </Link>
        <Link to='/' className='nav-link'>
          Term of use
        </Link>
        <Link to='/' className='nav-link'>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
