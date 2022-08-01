import { NavLink, Route, Routes } from "react-router-dom";
import WorkHoursPage from "./WorkHourPage";
import WeekDiagram from "../components/WeekDiagram";
import ReservationsPage from "./ReservationsPage";
import GeneralSettingsPage from "./GeneralSettingsPage";
import ServicesPage from "./ServicesPage";
import { useState } from "react";
import PlacePicker from "../components/PlacePicker";
import { useEffect } from "react";
import { fetchPlaces } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/configuration-page.scss";
import PlaceForm from "../components/PlaceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faListCheck,
  faBusinessTime,
  faReceipt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const ConfigurationPage = () => {
  const [activePlace, setActivePlace] = useState("");
  const [addNewPlace, setAddNewPlace] = useState(false);
  const { loading, places } = useSelector((state) => state.placesReducer);
  const { auth, userData } = useSelector((state) => state.userDataReducer);

  const dispatch = useDispatch();

  const addNewPlaceHandle = () => {};

  useEffect(() => {
    console.log("fetch places");
    dispatch(fetchPlaces());
  }, [activePlace, auth, userData]);

  return (
    <div className="configuration-page">
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
            </nav>
            <div className="configuration-pages-wrapper">
              <Routes>
                <Route
                  path="/"
                  element={<ReservationsPage activePlace={activePlace} />}
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
                {console.log(activePlace, "active place from congipage")}
              </Routes>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ConfigurationPage;
