import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
const LoginButton = () => {
  const { auth } = useSelector((state) => state.userDataReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandle = (e) => {
    if (auth) {
      dispatch(logout());
      navigate('/')
    } else {
      dispatch({ type: "showModal", payload: "LoginForm" });
    }
  };

  return (
    <button className="login-button" onClick={onClickHandle}>
      {auth ? "Wyloguj" : "Zaloguj | Zarejestruj"}
    </button>
  );
};

export default LoginButton;
