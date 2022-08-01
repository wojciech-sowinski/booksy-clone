import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/place-form.scss";
import { addPlace, updatePlace, deletePlace } from "../actions/userActions";

const PlaceForm = ({ activePlace, setActivePlace }) => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, places } = useSelector((state) => state.placesReducer);

  const formFieldChangeHandle = (e) => {
    let propertyValue;
    if (e.target.type === "checkbox") {
      propertyValue = e.target.checked;
    } else {
      propertyValue = e.target.value;
    }
    const propertyName = e.target.name;

    setFormData({ ...formData, [propertyName]: propertyValue });
  };

  const clearFormHandle = () => {
    setFormData({});
  };

  const deletePlaceHandle = (e) => {
    e.preventDefault();
    setActivePlace("");
    clearFormHandle();
    dispatch(deletePlace(formData));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (!activePlace) {
      dispatch(addPlace(formData));
    } else {
      dispatch(updatePlace(formData));
    }
  };

  useEffect(() => {
    if (activePlace) {
      setFormData(...places.filter((place) => place._id === activePlace));
    }
    return () => {
      clearFormHandle();
    };
  }, [activePlace, loading, places]);

  return (
    <form onSubmit={submitHandle} className="place-form">
      <div>
        <span>Dane miejsca:</span>
      </div>
      <input
        type="text"
        placeholder="Nazwa"
        name="name"
        onChange={formFieldChangeHandle}
        value={formData.name || ""}
        required
      />
      <div>
        <input
          style={{ width: "50%" }}
          type="text"
          placeholder="Ulica"
          name="street"
          onChange={formFieldChangeHandle}
          value={formData.street || ""}
        />
        <input
          style={{ width: "20%" }}
          type="text"
          placeholder="Nr domu"
          name="houseNumber"
          onChange={formFieldChangeHandle}
          value={formData.houseNumber || ""}
        />
        <span>/</span>
        <input
          style={{ width: "20%" }}
          type="text"
          placeholder="Lok"
          name="apartmentNumber"
          onChange={formFieldChangeHandle}
          value={formData.apartmentNumber || ""}
        />
      </div>
      <div>
        <input
          style={{ width: "30%" }}
          type="text"
          placeholder="Miasto"
          name="city"
          onChange={formFieldChangeHandle}
          value={formData.city || ""}
        />
        <input
          style={{ width: "30%" }}
          type="text"
          placeholder="Kod pocztowy"
          name="postalCode"
          onChange={formFieldChangeHandle}
          value={formData.postalCode || ""}
        />
        <input
          style={{ width: "30%" }}
          type="text"
          placeholder="Kraj"
          name="country"
          onChange={formFieldChangeHandle}
          value={formData.country || ""}
        />
      </div>
      <div>
        <input
          style={{ width: "50%" }}
          type="text"
          placeholder="Telefon"
          name="phone"
          onChange={formFieldChangeHandle}
          value={formData.phone || ""}
        />
        <input
          style={{ width: "50%" }}
          type="email"
          placeholder="Email"
          name="email"
          onChange={formFieldChangeHandle}
          value={formData.email || ""}
        />
      </div>
      <div>
        <input
          style={{ width: "10%" }}
          type="checkbox"
          name="emailSend"
          className="roundedTwo"
          onChange={formFieldChangeHandle}
          checked={formData.emailSend || false}
          id="email-send-checkbox"
        />
        <label style={{ width: "90%" }} htmlFor="email-send-checkbox">
          Czy wysyłać powiadomienie o rezerwacji na wskazany adres Email?
        </label>
      </div>
      <div>
        <input
          style={{ width: "10%" }}
          type="checkbox"
          name="suspend"
          className="roundedTwo"
          onChange={formFieldChangeHandle}
          checked={formData.suspend || false}
          id="suspend-checkbox"
        />
        <label style={{ width: "90%" }} htmlFor="suspend-checkbox">
          Czy wstrzymać możliwość rezerwacji?
        </label>
      </div>
      <div>
        <button type="submit">{activePlace ? "Zapisz" : "Dodaj"}</button>
        <button className="orange" onClick={clearFormHandle}>
          Wyczyść
        </button>
        {activePlace && (
          <button onClick={deletePlaceHandle} className="red">
            Usuń
          </button>
        )}
      </div>
    </form>
  );
};

export default PlaceForm;
