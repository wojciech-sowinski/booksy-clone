import "../styles/login-form.scss";
import "../styles/buttons.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import DataLoader from '../components/DataLoader'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false)
  const [loaderText, setLoaderText] = useState('')
  const { response, loading, userData } = useSelector(
    (state) => state.userDataReducer
  );
  const [loginInfo, setLoginInfo] = useState(response);
  const user = useSelector((state) => state.userDataReducer);

  const submitHandle = (e) => {
    e.preventDefault();
    setShowLoader(true)
    setLoaderText('Trwa logowanie')
    setLoginInfo("")
    loginUser({ email, password }, dispatch).then((resolve) => {
      if (resolve) {

        setLoaderText('Zalogowano')

        setTimeout(() => {
          setShowLoader(false)
          dispatch({ type: "hideModal" });
          navigate("/config");
        }, 1000);
      } else {
        setShowLoader(false)
        setLoaderText('')
        setLoginInfo("Zły login lub hasło");
        setTimeout(() => {
          setLoginInfo("");
        }, 10000);
      }
    });
  };

  useEffect(() => { });

  return (
    <>
      {showLoader && < DataLoader text={loaderText} />}
      <form onSubmit={submitHandle} className="login-form">

        <div>
          <span className="title">Logowanie</span>
        </div>
        <input
          type="email"
          name="login-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="login-password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="submit-button" type="submit" value="Zaloguj" />
        {loginInfo && (
          <div>
            <span className="login-info">{loginInfo}</span>
          </div>
        )}
        <div>
          <span>Nie masz jeszcze konta?</span>
        </div>
        <button
          onClick={() => {
            dispatch({ type: "showModal", payload: "RegistrationForm" });
          }}
        >
          Załóż nowe konto
        </button>
      </form>
    </>
  );
};

export default LoginForm;
