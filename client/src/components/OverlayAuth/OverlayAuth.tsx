import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import './OverlayAuth.css';

interface Props {
  isSlideLogin: boolean;
  setIsSlideLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlayAuth = (props: Props) => {
  const { isSlideLogin, setIsSlideLogin } = props;

  const handleClickSlideLogin = () => {
    setIsSlideLogin(true);
  };

  const handleClickSlideRegister = () => {
    setIsSlideLogin(false);
  };

  return (
    <>
      <div
        className={`overlay-container ${
          isSlideLogin ? 'overlay-container-right' : 'overlay-container-left'
        }`}
      >
        <div className='overlay'>
          <div className='overlay-panel overlay-left'>
            <h1 className='title'>
              Hello <br /> friends
            </h1>
            <p>You already have an account? Login here and have some fun</p>
            <button
              className='ghost'
              id='login'
              onClick={handleClickSlideLogin}
            >
              Login
              <AiOutlineArrowLeft className='overlay-icon login' />
            </button>
          </div>
          <div className='overlay-panel overlay-right'>
            <h1 className='title'>
              Start your <br /> journey now
            </h1>
            <p>You don't have an account yet? Create your own one now.</p>
            <button
              className='ghost'
              id='register'
              onClick={handleClickSlideRegister}
            >
              Register
              <AiOutlineArrowRight className='overlay-icon register' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayAuth;
