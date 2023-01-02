import "../styles/service-form.scss";
import '../styles/ValidationMsgs.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addService, updateService, deleteService } from "../actions/userActions";
import { useEffect } from "react";
import DataLoader from "../components/DataLoader";
import SimpleReactValidator from 'simple-react-validator'

const ServiceForm = ({ activeService, activePlace, closeForm, setDataLoaderText }) => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const { response, loading, services } = useSelector(
    (state) => state.servicesReducer
  );
  const simpleReactValidator = useRef(new SimpleReactValidator(
    {

      messages: {
        required: 'Pole wymagane'
      },

    }
  ))


  const submitHandle = (e) => {
    e.preventDefault();

    if (simpleReactValidator.current.allValid()) {
      if (activeService) {
        setDataLoaderText('Trwa edycja usługi')
        updateService({ ...formData }, dispatch)
          .then(resolve => {
            setDataLoaderText('Usługa zmieniona')
            setTimeout(() => {
              setDataLoaderText('')
            }, 2000);
          })
      } else {
        setDataLoaderText('Trwa dodawanie usługi')
        addService(activePlace, { ...formData, placeId: activePlace }, dispatch)
          .then(resolve => {
            setDataLoaderText('Usługa dodana')
            setTimeout(() => {
              setDataLoaderText('')
            }, 2000);
          })
      }
      closeForm()

    }


  };

  const deleteServiceHandle = (activeService) => {
    setDataLoaderText('Trwa usuwanie usługi')
    deleteService(activeService, dispatch)
      .then(resolve => {

        setDataLoaderText('Usługa usunięta')
        setTimeout(() => {
          setDataLoaderText('')
        }, 2000);
      })
  }
  const clearFormHandle = () => {
    setFormData({});
  };

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

  useEffect(() => {
    if (activeService) {
      const activeServiceData = services.filter(service => service._id === activeService)
      setFormData(...activeServiceData)
    }

  }, [activeService, activePlace])

  return (<>
    {/* <div onClick={closeForm} className="overlay"></div> */}

    <form onSubmit={submitHandle} className="service-form">
      <input
        type="text"
        placeholder="Nazwa Usługi"
        onChange={formFieldChangeHandle}
        name="name"
        value={formData.name || ""}
        required
        onFocus={() => simpleReactValidator.current.showMessageFor('name')}
        className={simpleReactValidator.current.message('name', formData.name, 'required') && 'not-valid'}
      />
      <textarea
        placeholder="Krótki opis usługi, max 200 znaków"
        cols="30"
        rows="4"
        name="description"
        onChange={formFieldChangeHandle}
        value={formData.description || ""}
      ></textarea>
      <div>
        <input
          style={{ width: "90%" }}
          type="number"
          placeholder="Czas trwania"
          name="duration"
          onChange={formFieldChangeHandle}
          value={formData.duration || ""}
          required
          onFocus={() => simpleReactValidator.current.showMessageFor('duration')}
          className={simpleReactValidator.current.message('duration', formData.duration, 'required') && 'not-valid'}
        />
        <span style={{ width: "10%" }}> minut</span>
      </div>
      <div>
        <input
          type="number"
          placeholder="Cena usługi"
          style={{ width: "90%" }}
          name="price"
          onChange={formFieldChangeHandle}
          required
          onFocus={() => simpleReactValidator.current.showMessageFor('price')}
          className={simpleReactValidator.current.message('price', formData.price, 'required') && 'not-valid'}
          value={formData.price || ""}
        />
        <span style={{ width: "10%" }}>PLN</span>
      </div>
      <div>
        <input
          style={{ width: "90%" }}
          type="number"
          placeholder="Dostępność"
          name="quanity"
          onChange={formFieldChangeHandle}
          value={formData.quanity || ""}
          required
          onFocus={() => simpleReactValidator.current.showMessageFor('quanity')}
          className={simpleReactValidator.current.message('quanity', formData.quanity, 'required') && 'not-valid'}
        />
        <span style={{ width: "10%" }}>szt.</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <span>
          Dostępność oznacza ile sztuk danej usługi można wykonać w tym samym
          czasie. Przykład: Dostępność 2 = dwóch pracowników może wykonać tą
          samą usługę na dwóch stanowiskach.
        </span>
      </div>
      <div>
        <input
          style={{ width: "10%" }}
          type="checkbox"
          id="service-suspend-checkbox"
          name="suspend"
          onChange={formFieldChangeHandle}
          checked={formData.suspend || ""}
        />
        <label style={{ width: "90%" }} htmlFor="service-suspend-checkbox">
          Zawieszone wykonywanie usługi (dokonanie rezerwacji nie będzie
          możliwe, już dokonane rezerwacje pozostają jako aktywne).
        </label>
      </div>
      {!simpleReactValidator.current.allValid() && <div><span className="srv-validation-message">* uzupełnij wymagane pola</span></div>}
      <div>
        <button className="green" type="submit">{activeService ? "Zapisz" : "Dodaj"}</button>
        <button onClick={closeForm}>Anuluj</button>
        <button className="orange" onClick={clearFormHandle}>
          Wyczyść
        </button>
        {activeService && (
          <button onClick={() => { deleteServiceHandle(activeService) }} className="red">
            Usuń
          </button>
        )}
      </div>
    </form>
  </>
  );
};

export default ServiceForm;
