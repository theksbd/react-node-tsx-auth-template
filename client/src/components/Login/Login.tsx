import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils/fetchData';
import { getFormData } from '../../utils/getFormData';
import FormInput from '../FormInput/FormInput';
import './Login.css';

interface Props {
  isSlideLogin: boolean;
}

const Login = ({ isSlideLogin }: Props) => {
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const { data: formData } = getFormData(e.currentTarget);

      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      };

      const response = await fetchData('auth/login', options);
      const data = await response.json();
      console.log(data);

      toast.success(`Welcome back, ${data.username} 🔥🔥`);
    } catch (error: any) {
      // For developers read only
      const errorDetails = await error.response.json();
      console.error(errorDetails.message);

      switch (error.response.status) {
        case StatusCodes.NOT_FOUND:
          toast.error('User with this email does not exist!');
          break;
        case StatusCodes.FORBIDDEN:
          toast.error('Incorrect email or password!');
          break;
        default:
          toast.error('Something went wrong! Please try again later.');
      }
    }
  };

  return (
    <>
      <div
        className={`form-container login-container ${
          isSlideLogin ? 'login-container-show' : 'login-container-hide'
        }`}
      >
        <form onSubmit={handleSubmitLogin}>
          <h1>Login</h1>

          <FormInput
            name='email'
            placeholder='Enter your email'
            type='email'
            label='Email'
            required
          />
          <FormInput
            name='password'
            placeholder='Enter your password'
            type='password'
            label='Password'
            required
          />

          <div className='content'>
            <div className='pass-link'>
              {/* TODO: Create Forgot Password component */}
              <Link to='/auth'>Forgot password?</Link>{' '}
            </div>
          </div>

          <button type='submit'>Login</button>

          <span>or use your account</span>

          <div className='social-container'>
            <div className='social'>
              <FcGoogle />
            </div>
            <div className='social'>
              <FaGithub />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
