import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceForm from "../components/PlaceForm";

const GeneralSettingsPage = ({ activePlace, setActivePlace }) => {
  const dispatch = useDispatch();
  const { info, loading, userData, auth } = useSelector(
    (state) => state.userDataReducer
  );
  return (
    <div className="general-settings-page">
      <main>
        {!activePlace ? (
          ""
        ) : (
          <PlaceForm
            activePlace={activePlace}
            setActivePlace={setActivePlace}
          />
        )}
      </main>
    </div>
  );
};

export default GeneralSettingsPage;
