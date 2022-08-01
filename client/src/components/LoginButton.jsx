import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
const LoginButton = () => {
  const { auth } = useSelector((state) => state.userDataReducer);

  const dispatch = useDispatch();

  const onClickHandle = (e) => {
    if (auth) {
      dispatch(logout());
    } else {
      dispatch({ type: "showModal", payload: "LoginForm" });
    }
  };

  return (
    <button className="login-button" onClick={onClickHandle}>
      {auth ? "Wyloguj" : "Zaloguj"}
    </button>
  );
};

export default LoginButton;
