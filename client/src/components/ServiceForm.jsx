import "../styles/service-form.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addService, updateService, deleteService } from "../actions/userActions";
import { useEffect } from "react";

const ServiceForm = ({ activeService, activePlace, closeForm }) => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { response, loading, services } = useSelector(
    (state) => state.servicesReducer
  );
  const [addServiceInfo, setAddServiceInfo] = useState(response);

  const submitHandle = (e) => {
    e.preventDefault();
    if (activeService) {

      updateService({ ...formData }, dispatch)
    } else {

      addService(activePlace, { ...formData, placeId: activePlace }, dispatch)
    }

    closeForm()
  };


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
    <div onClick={closeForm} className="overlay"></div>
    <form onSubmit={submitHandle} className="service-form">


      <input
        type="text"
        placeholder="Nazwa Usługi"
        onChange={formFieldChangeHandle}
        name="name"
        value={formData.name || ""}
        required
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
      <div>
        <button type="submit">{activeService ? "Zapisz" : "Dodaj"}</button>
        <button className="orange" onClick={clearFormHandle}>
          Wyczyść
        </button>
        {activeService && (
          <button onClick={() => { dispatch(deleteService(activeService)) }} className="red">
            Usuń
          </button>
        )}
      </div>
    </form>

  </>

  );
};

export default ServiceForm;
