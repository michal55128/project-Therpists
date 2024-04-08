import React from "react";
import { Link, useLocation} from 'react-router-dom';
import '../Css/Logo.css';

const Logo = () => {
    const location = useLocation();   
       console.log(location.pathname);

    return (<>
        {location.pathname !== '/HomePage' && (
            <Link to={'/'}><img id='logo' src={'/Assets/Images/logoy.png'} alt="Logo" /></Link>
        )}
        {location.pathname === '/HomePage' && (
            <img id='logo' src={'/Assets/Images/logoy.png'} alt="Logo" />
        )} 
    </>);
}

export default Logo;
