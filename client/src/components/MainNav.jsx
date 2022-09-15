import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useDispatch, useSelector } from "react-redux";
import '../styles/mainnav.scss'
import logomenu from '../media/logohor300.png'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

import {
  faBurger, faBars
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const MainNav = () => {
  const { auth } = useSelector((state) => state.userDataReducer);
  const [showMenu, setShowMenu] = useState(false)
  const location = useLocation();

  return (
    <ul className={`main-nav ${location.pathname !== '/' ? 'dark' : ''}`}>
      <Link to="/"><img className="menu-logo-img" src={logomenu} alt="logo" /></Link>
      <FontAwesomeIcon onClick={() => { setShowMenu(prev => !prev) }} className="burger-icon" icon={faBars} />
      <div className={showMenu ? 'show' : ''} onClick={() => { setShowMenu(false) }}>
        <li>
          <Link to="/">Strona Główna</Link>
        </li>
        {auth && (
          <li>
            <Link to="/config">Twoje Miejsca</Link>
          </li>
        )}
        <li>
          <LoginButton />
        </li>
      </div>
    </ul>
  );
};

export default MainNav;
