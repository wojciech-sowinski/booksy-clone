import "../styles/registration-form.scss";
import "../styles/buttons.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../actions/userActions";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registrationInfo, setRegistrationInfo] = useState("");

  const dispatch = useDispatch();
  const { response, loading } = useSelector((state) => state.userDataReducer);

  const submitHandle = (e) => {
    console.log('sub');
    e.preventDefault();
    if (password !== passwordConfirm) {
      setRegistrationInfo("Hasło i potwierdzenie hasła muszą być takie same.");
      setTimeout(() => {
        setRegistrationInfo("");
      }, 3000);
    } else {
      registerNewUser({ email, password }, dispatch).then((resolve) => {
        console.log('rewsolve',resolve);
        if (resolve === "user exists") {
          setRegistrationInfo("Użytkownik o podanym EMAIL już istnieje.");
        } else if (resolve === "user created") {
          setRegistrationInfo(
            "Profil użytkownika został utworzony. Zaloguj się."
          );
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          setTimeout(() => {
            setRegistrationInfo("");
            dispatch({ type: "showModal", payload: "LoginForm" });
          }, 3000);
        }
        setTimeout(() => {
          setRegistrationInfo("");
        }, 3000);
      });
    }
  };

  useEffect(() => {}, [response]);

  return (
    <form onSubmit={submitHandle} className="registration-form">
      <div>
        <span>Utwórz nowy profil</span>
      </div>
      <input
        type="email"
        name="registration-email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="registration-password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        name="registration-password-confirm"
        placeholder="Potwierdź Hasło"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <input className="submit-button" type="submit" value="Utwórz Profil" />
      {registrationInfo && (
        <div>
          <span className="registration-info">{registrationInfo}</span>
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
