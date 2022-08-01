import "../styles/place-picker.scss";
import "../styles/buttons.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchPlaces } from "../actions/userActions";

const PlacePicker = ({ setActivePlace, setAddNewPlace }) => {
  const { loading, places } = useSelector((state) => state.placesReducer);
  const [selectedPlace, setSelectedPlace] = useState("");
  const dispatch = useDispatch();

  const addPlaceHandle = () => {
    setSelectedPlace("");
    setActivePlace("");
    setAddNewPlace(true);
  };
  const onChangeHandle = (e) => {
    setSelectedPlace(e.target.value);
    setActivePlace(e.target.value);
  };
  const placesRender = () => {
    const options = places.map((place) => {
      return (
        <option key={place.name} value={place._id}>
          {place.name} | {place.street} {place.houseNumber} | {place.city}
        </option>
      );
    });

    return options;
  };

  useEffect(() => {
    setActivePlace("");
    dispatch(fetchPlaces());
  }, []);

  return (
    <div className="place-picker">
      <span className="title">Twoje miejsca:</span>
      <div>
        <select name="places" value={selectedPlace} onChange={onChangeHandle}>
          <option value="">---</option>
          {placesRender()}
        </select>
        <button className="add-place-button" onClick={addPlaceHandle}>
          <FontAwesomeIcon icon={faPlus} />
          <span> Dodaj</span>
        </button>
      </div>
    </div>
  );
};

export default PlacePicker;
