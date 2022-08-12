import "../styles/place-picker.scss";
import "../styles/buttons.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchPlaces } from "../actions/userActions";
import Select from 'react-dropdown-select';

const PlacePicker = ({ setActivePlace, setAddNewPlace }) => {
  const { loading, places } = useSelector((state) => state.placesReducer);
  const [selectedPlace, setSelectedPlace] = useState("");
  const dispatch = useDispatch();

  const options = places.map(place => {
    return {
      ...place, label: `${place.name} | ${place.street} ${place.houseNumber} | ${place.city}`, value: place._id
    }
  })

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

      <div><Select
        separator
        placeholder='wybierz miejsce...'
        clearable
        options={options}
        noDataRenderer={() => 'Brak miejsc. Dodaj nowe.'}
        onChange={(values) => setActivePlace(values[0]?._id)}
        onClearAll={(values) => setActivePlace('')}
        itemRenderer={({ item, methods }) => (<div onClick={() => methods.addItem(item)} className="option-div">
          <span className="place-title">{item.name}</span>
          <span className="place-info">{item.street} {item.houseNumber} | {item.city}</span>
        </div>)}
      /><button className="add-place-button" onClick={addPlaceHandle}>
          <FontAwesomeIcon icon={faPlus} />
          <span> Dodaj</span>
        </button></div>
    </div>
  );
};

export default PlacePicker;
