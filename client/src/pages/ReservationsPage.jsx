import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import allLocales from '@fullcalendar/core/locales-all';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrash, faPlus, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import '../styles/callendar.scss'
import ReservationForm from '../components/ReservationForm';
import { useState, useEffect } from 'react';
import DataLoader from '../components/DataLoader';
import AutoScrollOnMount from '../components/AutoScrollOnMount';
import axios from 'axios';
import config from '../config';
import ConfirmBtn from 'react-confirm-btn'
import { NavLink, Route, Routes } from "react-router-dom";
import timeGridPlugin from '@fullcalendar/timegrid';


const ReservationsPage = ({ activePlace }) => {

  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)

  const eventDeleteHandle = (eventId) => {

    axios.delete(config.serverUrl + "reservations", {
      headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
      data: {
        reservationId: eventId,
      },
    })
      .then((resolve) => {
        console.log(resolve.data);
        fetchReservations()
      });

  }

  const formatTimeComponent = (number) => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  const renderEventContent = (eventInfo) => {

    const startTime = `${formatTimeComponent(parseInt(eventInfo.event.extendedProps.serviceStart / 60))}:${formatTimeComponent(eventInfo.event.extendedProps.serviceStart - parseInt(eventInfo.event.extendedProps.serviceStart / 60) * 60)}`
    const endTime = `${formatTimeComponent(parseInt(eventInfo.event.extendedProps.serviceEnd / 60))}:${formatTimeComponent(eventInfo.event.extendedProps.serviceEnd - parseInt(eventInfo.event.extendedProps.serviceEnd / 60) * 60)}`

    return (
      <>
        <span onClick={openEventHandle} className='event-time'>{`${startTime} - ${endTime}`} <span><FontAwesomeIcon icon={faCaretDown} /></span></span>
        <span className='event-title'>{eventInfo.event.title}</span >
        <span className='event-client'>{`${eventInfo.event.extendedProps.clientFirstName} ${eventInfo.event.extendedProps.clientLastName}`}</span >
        <span className='event-client'>{`${eventInfo.event.extendedProps.email}`}</span >
        <ConfirmBtn className={'event-delete-button'} onConfirm={() => { eventDeleteHandle(eventInfo.event.extendedProps._id) }} time={5000} confirmText={'Potwierdź'}  > Anuluj rezerwację </ConfirmBtn>
      </>
    )
  }

  const openEventHandle = (e) => {
    e.currentTarget.parentNode.classList.toggle('open')
  }

  const fetchReservations = async () => {

    setEventsLoading(true)
    axios.get(config.serverUrl + 'reservations', {
      headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
      params: {
        activePlace
      },
    })
      .then(resolve => {
        if (resolve.data.success) {
          const eventsToRender = resolve.data.reservations.map(reservation => {
            const date = new Date(reservation.serviceDate)
            const startTime = `${formatTimeComponent(parseInt(reservation.serviceStart / 60))}:${formatTimeComponent(reservation.serviceStart - parseInt(reservation.serviceStart / 60) * 60)}`
            const endTime = `${formatTimeComponent(parseInt(reservation.serviceEnd / 60))}:${formatTimeComponent(reservation.serviceEnd - parseInt(reservation.serviceEnd / 60) * 60)}`
            const eventStart = `${date.getFullYear()}-${formatTimeComponent(date.getMonth() + 1)}-${formatTimeComponent(date.getDate())}T${startTime}:00.000Z`
            const eventEnd = `${date.getFullYear()}-${formatTimeComponent(date.getMonth() + 1)}-${formatTimeComponent(date.getDate())}T${endTime}:00.000Z`

            return {
              ...reservation,
              title: reservation.serviceInfo[0].name,
              start: eventStart,
            }
          })

          eventsToRender.sort((a, b) => {
            if (a.serviceStart < b.serviceStart) {
              return -1
            } else if (a.serviceStart > b.serviceStart) {
              return 1
            } else {
              return 0
            }
          })

          setTimeout(() => {
            setEvents(eventsToRender)
            setEventsLoading(false)
          }, 1000);
        }
      })


  }

  useEffect(() => {
    fetchReservations()
  }, [activePlace])

  return (
    <div className="reservations-page">
      <main>
        <div className='button-bar'>
          <div>
            <NavLink className={'add-reservation-button'} to="./reservation">
              <span><FontAwesomeIcon icon={faPlus} />  Dodaj rezerwacje</span>
            </NavLink>
          </div>
          <div className={'refresh-reservation-button'} onClick={fetchReservations}>
            <span><FontAwesomeIcon icon={faArrowsRotate} />  Odśwież </span>
          </div>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          locales={allLocales}
          locale={'pl'}
          height={'auto'}
          timeZone={'UTC'}
          eventMinHeight={60}
          expandRows={true}
        />
        {eventsLoading && <DataLoader text={'Aktualizuję listę rezerwacji'} />}
      </main>
    </div>
  );
};

export default ReservationsPage;
