import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './BackgroundHandler.css';

const BackgroundHandler = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState('url(/backgroundimages/signup.jpg)');
  const [fade, setFade] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      switch (location.pathname) {
        case '/':
          setBackgroundImage('url(/backgroundimages/signup.jpg)');
          break;
        case '/login':
          setBackgroundImage('url(/backgroundimages/login.jpg)');
          break;
        case '/home':
          setBackgroundImage('url(/backgroundimages/home.jpg)');
          break;
        case '/profile':
          setBackgroundImage('url(/backgroundimages/profile.jpg)');
          break;
        default:
          if (location.pathname.startsWith('/profile/')) {
            setBackgroundImage('url(/backgroundimages/profile.jpg)');
          } else {
            setBackgroundImage('url(/backgroundimages/signup.jpg)');
          }
          break;
      }
      setFade(false);
    }, 0);
  
    setFade(true);
  
    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.key]);

  return (
    <div className={`background-container ${fade ? 'fade-out' : ''}`} style={{ backgroundImage }}>
      {children}
    </div>
  );
};

export default BackgroundHandler;
