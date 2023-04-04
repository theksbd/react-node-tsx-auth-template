import { useState } from 'react';
import Login from '../../components/Login/Login';
import OverlayAuth from '../../components/OverlayAuth/OverlayAuth';
import Register from '../../components/Register/Register';
import './Authentication.css';

const Authentication = () => {
  const [isSlideLogin, setIsSlideLogin] = useState<boolean>(true);

  return (
    <main
      className={`auth-container ${
        isSlideLogin ? 'left-panel-active' : 'right-panel-active'
      }`}
      id='auth-container'
    >
      <Login isSlideLogin={isSlideLogin} />
      <Register isSlideLogin={isSlideLogin} setIsSlideLogin={setIsSlideLogin} />
      <OverlayAuth
        isSlideLogin={isSlideLogin}
        setIsSlideLogin={setIsSlideLogin}
      />
    </main>
  );
};

export default Authentication;
