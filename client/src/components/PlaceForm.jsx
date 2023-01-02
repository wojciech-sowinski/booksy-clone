import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../styles/ValidationMsgs.scss'
import "../styles/place-form.scss";
import { addPlace, updatePlace, deletePlace } from "../actions/userActions";
import DataLoader from "./DataLoader";
import SimpleReactValidator from 'simple-react-validator'

const PlaceForm = ({ activePlace, setActivePlace }) => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, places } = useSelector((state) => state.placesReducer);
  const [showLoader, setShowLoader] = useState(false)
  const [loaderText, setLoaderText] = useState('')


  const simpleReactValidator = useRef(new SimpleReactValidator(
    {

      messages: {
        email: 'Nieprawidłowy adres email',
        required: 'Pole wymagane'
      },

    }
  ))

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
    setShowLoader(true)
    setLoaderText('Trwa usuwanie miejsca')
    deletePlace(formData, dispatch)
      .then(resolve => {
        setLoaderText('Miejsce usunięte')
        clearFormHandle();
        setTimeout(() => {
          setShowLoader(false)
          setLoaderText('')
          setActivePlace("");
        }, 2000);
      })
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (simpleReactValidator.current.allValid()) {
      setShowLoader(true)
      if (!activePlace) {
        setLoaderText('Trwa dodawanie nowego miejsca')
        addPlace(formData, dispatch)
          .then(resolve => {
            setLoaderText('Miejsce dodane')
            setTimeout(() => {
              setShowLoader(false)
              setLoaderText('')
            }, 2000);
          })
      } else {
        setLoaderText('Trwa zmiana danych')
        updatePlace(formData, dispatch)
          .then(resolve => {
            setLoaderText('Dane miejsca zostały zmienione')
            setTimeout(() => {
              setShowLoader(false)
              setLoaderText('')
            }, 2000);
          })
      }
    } else {
      simpleReactValidator.current.showMessages()
      console.log('check');
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
    <>
      {showLoader && <DataLoader text={loaderText} />}

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
          // required
          className={simpleReactValidator.current.message('name', formData.name, 'required') && 'not-valid'}
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
          <div>

            <input
              style={{ width: "50%" }}
              className={simpleReactValidator.current.message('email', formData.email, 'required') && 'not-valid'}
              type="email"
              placeholder="Email"
              name="email"
              onChange={formFieldChangeHandle}
              value={formData.email || ""}
              onFocus={() => simpleReactValidator.current.showMessageFor('email')}

            />
            <div>

            </div>
          </div>

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

        {!simpleReactValidator.current.allValid() && <div><span className="srv-validation-message">* uzupełnij wymagane pola</span></div>}

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
    </>
  );
};

export default PlaceForm;
