import { useDispatch, useSelector } from "react-redux";

const RegisterButton = () => {
    const { auth } = useSelector((state) => state.userDataReducer);

    const dispatch = useDispatch();


    const onClickHandle = (e) => {

        dispatch({ type: "showModal", payload: "RegistrationForm" });

    };

    return (
        <button className="register-button" onClick={onClickHandle}>
            Załóż swój profil
        </button>
    );
};

export default RegisterButton;
