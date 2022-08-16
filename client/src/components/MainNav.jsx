import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useDispatch, useSelector } from "react-redux";
import '../styles/mainnav.scss'
import logomenu from '../media/logohor300.png'

const MainNav = () => {
  const { auth } = useSelector((state) => state.userDataReducer);
  return (
    <ul className="main-nav">
      <li>
        <Link to="/"><img className="menu-logo-img" src={logomenu} alt="logo" /></Link>
      </li>
      <div>

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
