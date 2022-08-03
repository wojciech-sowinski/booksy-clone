import "../styles/registration-form.scss";
import "../styles/buttons.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../actions/userActions";
import PasswordStrengthBar from 'react-password-strength-bar';

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registrationInfo, setRegistrationInfo] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0)

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
        console.log('rewsolve', resolve);
        if (resolve === "user exists") {
          setRegistrationInfo("Użytkownik o podanym EMAIL już istnieje.");
        } else if (resolve === "password to short") {
          setRegistrationInfo("Hasło jest zbyt krótkie");
          setTimeout(() => {
            setRegistrationInfo("");
          }, 3000);
        }
        else if (resolve === "user created") {
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

  useEffect(() => { }, [response]);

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
      <PasswordStrengthBar
        password={password}
        minLength={5}
        className='password-strenght-bar'
        scoreWords={['hasło jest zbyt słabe', 'hasło jest zbyt słabe', 'średnie hasło', 'OK', 'Silne hasło']}
        shortScoreWord={'Hasło musi mieć min. 5 znaków'}
        onChangeScore={(score, feedback) => { setPasswordStrength(score) }} />
      < input
        type="password"
        name="registration-password-confirm"
        placeholder="Potwierdź Hasło"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <input className="submit-button" disabled={passwordStrength < 2} type="submit" value="Utwórz Profil" />
      {registrationInfo && (
        <div>
          <span className="registration-info">{registrationInfo}</span>
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
