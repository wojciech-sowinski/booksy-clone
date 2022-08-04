import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import allLocales from '@fullcalendar/core/locales-all';

import '../styles/callendar.scss'
import ReservationForm from '../components/ReservationForm';
import { useState } from 'react';

const ReservationsPage = ({ activePlace }) => {




  const events = [
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-03' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-04' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-04' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-04' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-06' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-13' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-14' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-14' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-14' },
    { title: 'Psia kąpiel\n 10:00-12:00', date: '2022-08-16' },
  ]

  function renderEventContent(eventInfo) {
    return (
      <>

        <p>{eventInfo.event.title}</p>

      </>
    )
  }

  const dayClickHandle = (arg) => {
    console.log('day', arg);
  }

  return (
    <div className="reservations-page">

      <main>
        <div>
          {/* <div className="overlay"></div> */}
          <ReservationForm activePlace={activePlace} />
        </div>
        {/* <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={dayClickHandle}
          eventContent={renderEventContent}
          locales={allLocales}
          locale={'pl'}
          height={'auto'}

        /> */}

      </main>
    </div>
  );
};

export default ReservationsPage;
