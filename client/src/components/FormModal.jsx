import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import PlaceForm from "./PlaceForm";
import RegistrationForm from "./RegistrationForm";
import TimeFrameForm from './TimeFrameForm'
import "../styles/form-modal.scss";

const FormModal = ({ formType }) => {
  const { show, type } = useSelector((state) => state.formModalReducer);
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch({ type: "hideModal" });
  };

  useEffect(() => {
    return () => {
      //   dispatch({ type: "hideModal" });
    };
  }, []);

  return (
    <div className="form-modal">
      <div className="form-modal-overlay" onClick={hideModal}></div>
      {show && type === "LoginForm" && <LoginForm />}
      {show && type === "PlaceForm" && <PlaceForm />}
      {show && type === "RegistrationForm" && <RegistrationForm />}
      {show && type === "TimeFrameForm" && <TimeFrameForm />}
    </div>
  );
};

export default FormModal;
