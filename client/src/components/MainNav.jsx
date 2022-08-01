import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useDispatch, useSelector } from "react-redux";

const MainNav = () => {
  const { auth } = useSelector((state) => state.userDataReducer);
  return (
    <ul className="test-nav">
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
    </ul>
  );
};

export default MainNav;
