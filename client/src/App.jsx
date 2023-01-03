import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Prompt,
} from "react-router-dom";
import "./styles/App.scss";
import ConfigurationPage from "./pages/ConfigurationPage";
import { fetchUserData } from "./actions/userActions";
import FormModal from "./components/FormModal";
import config from "./config";
import HomePage from "./pages/HomePage";
import MainNav from "./components/MainNav";
import ReservationPage from "./pages/AddReservationPage";
import HowToPage from "./pages/HowToPage";

function App() {
  const { info, loading, userData, auth } = useSelector(
    (state) => state.userDataReducer
  );
  const { show, type } = useSelector((state) => state.formModalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(config.authTokenName)) {
      dispatch(fetchUserData());
    }
  }, [auth]);

  return (
    <Router>
      <div className="App">
        {show && <FormModal />}
        {<MainNav />}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/register" element={<RegistrationForm />} />
            {auth && <Route path="/config/*" element={<ConfigurationPage />} />}
            <Route
              path="/addreservation"
              element={<ReservationPage />}
            />
            <Route
              path="/howto"
              element={<HowToPage />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
