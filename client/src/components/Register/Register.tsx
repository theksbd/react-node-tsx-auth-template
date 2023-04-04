import { StatusCodes } from 'http-status-codes';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { fetchData } from '../../utils/fetchData';
import { getFormData } from '../../utils/getFormData';
import FormInput from '../FormInput/FormInput';
import './Register.css';

interface Props {
  isSlideLogin: boolean;
  setIsSlideLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ isSlideLogin, setIsSlideLogin }: Props) => {
  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const response = await fetchData('auth/register', options);
      const data = await response.json();
      console.log(data);

      toast.success("You've successfully registered!");
      setIsSlideLogin(true);
    } catch (error: any) {
      // For developers read only
      const errorDetails = await error.response.json();
      console.error(errorDetails.message);

      switch (error.response.status) {
        case StatusCodes.CONFLICT:
          toast.error('User with this email already exists!');
          break;
        default:
          toast.error('Something went wrong! Please try again later.');
      }
    }
  };

  return (
    <>
      <div
        className={`form-container register-container ${
          isSlideLogin ? 'register-container-hide' : 'register-container-show'
        }`}
      >
        <form onSubmit={handleSubmitRegister}>
          <h1>Register</h1>

          <FormInput
            name='email'
            placeholder='Enter your email'
            type='email'
            label='Email'
            required
          />
          <FormInput
            name='username'
            placeholder='Enter your username'
            type='text'
            label='Username'
            required
          />
          <FormInput
            name='password'
            placeholder='Enter your password'
            type='password'
            label='Password'
            required
          />

          <button type='submit'>Register</button>

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

export default Register;
