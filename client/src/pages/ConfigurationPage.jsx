import { NavLink, Route, Routes } from "react-router-dom";
import WorkHoursPage from "./WorkHourPage";
import WeekDiagram from "../components/WeekDiagram";
import ReservationsPage from "./ReservationsPage";
import GeneralSettingsPage from "./GeneralSettingsPage";
import ServicesPage from "./ServicesPage";
import ReservationPage from "./AddReservationPage";
import ApiKeysPage from "./ApiKeysPage";
import { useState } from "react";
import PlacePicker from "../components/PlacePicker";
import { useEffect } from "react";
import { fetchPlaces, fetchServices, fetchTimeFrames } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/configuration-page.scss";
import PlaceForm from "../components/PlaceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReservationForm from '../components/ReservationForm'
import {
  faCalendarCheck,
  faListCheck,
  faBusinessTime,
  faReceipt,
  faStar,
  faWrench,
  faMobileScreenButton
} from "@fortawesome/free-solid-svg-icons";

const ConfigurationPage = () => {
  const [activePlace, setActivePlace] = useState("");
  const [addNewPlace, setAddNewPlace] = useState(false);
  const { loading, places } = useSelector((state) => state.placesReducer);
  const { auth, userData } = useSelector((state) => state.userDataReducer);
  const [orientationHor, setOrientationHor] = useState(true);


  const dispatch = useDispatch();


  const horizontalCheck = () => {

    if ((window.innerHeight > window.innerWidth) && (window.innerWidth < 768)) {

      setOrientationHor(true)
    } else {
      setOrientationHor(false)
    }

  }


  const horizontalInfo = () => {

    return (
      <div className='data-loader horizontal-info'>
        <FontAwesomeIcon icon={faMobileScreenButton} />
        <span>Obróć urządzenie</span>
      </div>
    )

  }

  useEffect(() => {
    dispatch(fetchPlaces());
    fetchServices(dispatch)
    dispatch(fetchTimeFrames())

    horizontalCheck()

    window.addEventListener('orientationchange', horizontalCheck)
    window.addEventListener('resize', horizontalCheck)

    return () => {
      window.removeEventListener('resize', horizontalCheck)
      window.removeEventListener('orientationchange', horizontalCheck)
    }

  }, [activePlace, auth, userData]);

  return (
    <div className="configuration-page">
      {orientationHor && horizontalInfo()}
      <main>
        <PlacePicker
          setActivePlace={setActivePlace}
          setAddNewPlace={setAddNewPlace}
        />
        {!activePlace ? (
          addNewPlace ? (
            <PlaceForm />
          ) : (
            ""
          )
        ) : (
          <>
            <nav className="configuration-nav">
              <NavLink to="./">
                <FontAwesomeIcon icon={faReceipt} />
                <span> rezerwacje</span>
              </NavLink>
              <NavLink to="./general">
                <FontAwesomeIcon icon={faListCheck} />
                <span> ustawienia ogólne</span>
              </NavLink>
              <NavLink to="./workhours">
                <FontAwesomeIcon icon={faBusinessTime} />
                <span> godziny pracy</span>
              </NavLink>
              <NavLink to="./servicescatalog">
                <FontAwesomeIcon icon={faStar} />
                <span> usługi</span>
              </NavLink>
              <NavLink to={`./apikeys`}>
                <FontAwesomeIcon icon={faWrench} />
                <span> API/Linki</span>
              </NavLink>
            </nav>
            <div className="configuration-pages-wrapper">
              <Routes>
                <Route
                  path="/"
                  element={<ReservationsPage activePlace={activePlace} />}
                />
                <Route
                  path="/reservation"
                  element={
                    <ReservationForm activePlace={activePlace} />
                  }
                />
                <Route
                  path="/general"
                  element={
                    <GeneralSettingsPage
                      activePlace={activePlace}
                      setActivePlace={setActivePlace}
                    />
                  }
                />
                <Route
                  path="/workhours"
                  element={<WeekDiagram activePlace={activePlace} />}
                />
                <Route
                  path="/servicescatalog"
                  element={<ServicesPage activePlace={activePlace} />}
                />
                <Route
                  path="/apikeys"
                  element={<ApiKeysPage activePlace={activePlace} />}
                />
              </Routes>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ConfigurationPage;
