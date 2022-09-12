import ServiceForm from "../components/ServiceForm";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../styles/services-page.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faStopwatch, faCoins, faPeopleGroup, faPenToSquare, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteService } from "../actions/userActions";

const ServicesPage = ({ activePlace }) => {

  const [showServiceForm, setShowServiceForm] = useState('')
  const [activeService, setActiveService] = useState('')
  const { services, loading } = useSelector(
    (state) => state.servicesReducer
  );
  const dispatch = useDispatch();

  const closeForm = () => {
    setShowServiceForm(false)
    setActiveService('')
  }

  const showForm = (serviceId) => {
    setActiveService(serviceId)
    setShowServiceForm(true)
  }

  const renderServices = (activePlace, services) => {

    const filteredServices = services?.filter(service => service.placeId === activePlace)

    return filteredServices?.map(service => {

      return (<li key={service._id} className={`service ${(service.suspend ? 'suspend' : '')}`}>
        <div>
          <div><span className={`service-title `}>{service.name}</span></div>
          <div className="service-properties">
            <span><FontAwesomeIcon icon={faStopwatch} /> {service.duration} min.</span>
            <span><FontAwesomeIcon icon={faCoins} /> {service.price} pln.</span>
            <span><FontAwesomeIcon icon={faPeopleGroup} /> {service.quanity}</span>
          </div>
          <div className="service-description"><p>{service.description}</p></div>
          {service.suspend ? <div className="service-suspend-info"><span><FontAwesomeIcon icon={faExclamationTriangle} /> Usługa zawieszona</span></div> : ''}
        </div>
        <div className="service-buttons">
          <button onClick={() => { showForm(service._id) }}><FontAwesomeIcon icon={faPenToSquare} /></button>
          <button onClick={() => { dispatch(deleteService(service._id)) }}><FontAwesomeIcon icon={faTrashCan} /></button>
        </div>
      </li>)
    })

  }


  return (
    <div className="services-page">

      <main>
        {showServiceForm && <ServiceForm activePlace={activePlace} activeService={activeService} closeForm={closeForm} />}
        <button onClick={() => { setShowServiceForm(true) }}><FontAwesomeIcon icon={faPlus} /><span> Dodaj nową usługę</span></button>
        <ul className="services-list">
          {renderServices(activePlace, services)}
        </ul>
      </main>
    </div>
  );
};

export default ServicesPage;
