import { useState } from "react";
import { useEffect, useRef, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-dropdown-select';
import '../styles/servicePicker.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import AutoScrollOnMount from "./AutoScrollOnMount";
import DataLoader from "./DataLoader";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
const ReservationForm = ({ activePlace }) => {

    const daysOfWeek = [
        "niedziela",
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota",
    ];

    const [activeService, setActiveService] = useState('')
    const [activeDate, setActiveDate] = useState('')
    const [activeTerm, setActiveTerm] = useState('')
    const [termsLoading, setTermsLoading] = useState(false)
    const [freeTerms, setFreeTerms] = useState([])
    const [guestFirstName, setGuestFirsName] = useState('')
    const [guestLastName, setGuestLastName] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [guestConsent, setGuestConsent] = useState(false)
    const [options, setOptions] = useState([])
    const [optionsLoading, setOptionsLoading] = useState(false)
    const [reservationSending, setReservationSending] = useState(false)
    const [reservationSendingInfo, setReservationSendingInfo] = useState('Wysyłam rezerwację')

    const scrollRef = createRef()
    const navigate = useNavigate();


    const dispatch = useDispatch();

    const fetchServices = async (activePlace) => {

        setOptionsLoading(true)
        await axios.get(config.serverUrl + 'pservices', {
            params: {
                activePlace
            }
        })
            .then(resolve => {
                if (resolve.data.result) {

                    const fetchedServices = resolve.data.services.map(service => {
                        return {
                            ...service, label: `${service.name}`, value: service._id
                        }
                    })
                    setTimeout(() => {
                        setOptions(fetchedServices)
                        setOptionsLoading(false)
                    }, 500);
                }
            })
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        setReservationSending(true)
        await axios.post(config.serverUrl + 'bookit', {
            placeId: activePlace,
            serviceId: activeService,
            serviceDate: activeDate.fullDate,
            serviceStart: activeTerm.start,
            serviceEnd: activeTerm.end,
            clientFirstName: guestFirstName,
            clientLastName: guestLastName,
            email: guestEmail,
            dayOfWeek: activeDate.dayOfWeek
        }).then(resolve => {
            if (resolve.data.success) {
                setReservationSendingInfo('Rezerwacja wysłana')
                setTimeout(() => {
                    setReservationSending(false)
                    setReservationSendingInfo('Wysyłam rezerwację')
                    navigate('../')
                }, 1000);
            }
        })

    }

    const guestData = () => {


        return (<>
            <span><span className="number">4</span>Podaj swoje dane:</span>
            <form onSubmit={submitHandle} className="guest-data">
                <div>
                    <input value={guestFirstName} onChange={(e) => setGuestFirsName(e.currentTarget.value)} name='firstName' required type="text" placeholder="Imię" />
                    <input value={guestLastName} onChange={(e) => setGuestLastName(e.currentTarget.value)} name='lastName' required type="text" placeholder="Nazwisko" />
                </div>
                <div>
                    <input value={guestEmail} onChange={(e) => setGuestEmail(e.currentTarget.value)} type="email" name="email" placeholder="Adres Email" required />
                </div>
                <div>
                    <input checked={guestConsent} onChange={(e) => setGuestConsent(e.currentTarget.checked)} type="checkbox" name="consent" id="consent-check" required />
                    <label htmlFor="consent-check"> Oświadczam, że zapoznałem się z regulaminem oraz wyrażam zgodę na użycie moich danych w celu przetwarzania rezerwacji.</label>
                </div>
                <div>
                    <button type="submit">Rezerwuj</button>
                </div>

            </form>

        </>)
    }



    const formatTimeComponent = (number) => {
        return number.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    };

    const pickTermHandle = (e) => {
        const termsToResetClass = document.querySelectorAll('.term')
        termsToResetClass.forEach(day => day.classList.remove('active'))
        e.currentTarget.className += " active"
        setActiveTerm({ start: e.currentTarget.dataset.termstart, end: e.currentTarget.dataset.termend })
    }

    const checkFreeTerms = async (activePlace, activeService, date, dayOfWeek) => {

        setTermsLoading(true)
        setActiveTerm('')

        await axios.get(config.serverUrl + 'terms', {
            params: {
                activePlace, activeService, date, dayOfWeek
            }
        })
            .then(resolve => {
                if (resolve.data.success) {
                    const terms = resolve.data.freeTerms.map(freeTerm => {
                        return <SplideSlide key={freeTerm.start + freeTerm.end} className="term" data-termstart={freeTerm.start} data-termend={freeTerm.end} data-fullterm={`${formatTimeComponent(parseInt(freeTerm.start / 60))} : ${formatTimeComponent(
                            parseInt(freeTerm.start - parseInt(freeTerm.start / 60) * 60)
                        )}`} onClick={(e) => { pickTermHandle(e) }}>
                            <span className="time-picker-time">{formatTimeComponent(parseInt(freeTerm.start / 60))} : {formatTimeComponent(
                                parseInt(freeTerm.start - parseInt(freeTerm.start / 60) * 60)
                            )}</span>
                        </SplideSlide>
                    })
                    setTimeout(() => {
                        setFreeTerms(terms)
                        setTermsLoading(false)
                    }, 500);

                }
            })
    }

    const timePicker = () => {
        return (
            <>
                <div >
                    <span><span className="number">3</span>Wybierz czas:</span>
                    <div className="time-picker">

                        {freeTerms.length && activeDate ? <><Splide
                            id="terms"
                            options={
                                {
                                    maxWidth: 600,
                                    fixedWidth: 100,
                                    fixedHeight: 100,
                                    drag: true,
                                    pagination: false,
                                    breakpoints: {
                                        1024: {
                                            fixedWidth: 100,
                                            fixedHeight: 100,
                                        }
                                    }
                                }
                            }
                        >
                            {freeTerms}
                        </Splide></> : <div><span className="term-info">Brak wolnych terminów w wybranym dniu</span></div>}

                    </div>

                </div>

            </>

        )
    }

    const datePicker = () => {


        const pickDateHandle = (e) => {
            const fullDate = e.currentTarget.dataset.fulldate
            const dayOfWeek = e.currentTarget.dataset.dayofweek
            const daysToResetClass = document.querySelectorAll('.day')
            daysToResetClass.forEach(day => day.classList.remove('active'))
            e.currentTarget.className += " active"
            setActiveDate({ fullDate, dayOfWeek })
            checkFreeTerms(activePlace, activeService, fullDate, dayOfWeek)
        }

        const date = new Date()
        const days = []

        for (let i = 0; i < 30; i++) {
            date.setDate(date.getDate() + 1)
            const fullDateToSet = date.getFullYear() + '-' + formatTimeComponent(date.getMonth() + 1) + '-' + formatTimeComponent(date.getDate())
            const dayOfWeek = date.getDay()
            days.push((<SplideSlide className="day" data-fulldate={fullDateToSet} data-dayofweek={dayOfWeek} key={fullDateToSet} onClick={(e) => { pickDateHandle(e) }}>
                <span className="date-picker-day-of-week">{daysOfWeek[date.getDay()]}</span>
                <span className="date-picker-day">{formatTimeComponent(date.getDate())}</span>
                <span className="date-picker-month-year">{formatTimeComponent(date.getMonth() + 1)}-{date.getFullYear()}</span>
            </SplideSlide>))
        }

        return (
            <><span><span className="number">2</span>Wybierz datę:</span>
                <div className="date-picker">
                    <Splide
                        id="days"
                        options={
                            {
                                maxWidth: 600,
                                fixedWidth: 100,
                                fixedHeight: 100,
                                drag: true,
                                pagination: false,
                                breakpoints: {
                                    1024: {
                                        fixedWidth: 100,
                                        fixedHeight: 100,
                                    }
                                }
                            }
                        }
                    >
                        {days}
                    </Splide>
                    {/*  */}
                </div>
            </>
        )
    }

    const servicePicker = (activePlace) => {



        return (<div className="service-picker">

            <span ><span className="number">1</span> Wybierz usługę:</span>

            <Select
                placeholder='wybierz usługę...'

                closeOnSelect
                clearable
                options={options}
                required

                noDataRenderer={() => 'Brak usług...'}
                onChange={(values) => setActiveService(values[0]?._id)}
                onClearAll={(values) => setActiveService('')}
                itemRenderer={({ item, methods }) => (<div onClick={() => methods.addItem(item)} className="option-div">
                    <span className="place-title">{item.name}</span>
                    <div><span className="place-info"> Czas trwania: {item.duration} min.</span><span className="place-info"> Koszt: {item.price}pln</span></div>
                    {/* {item.description && <span className="place-info"> Opis: {item.description}</span>} */}
                </div>)}
            />
        </div>)
    }

    useEffect(() => {


        fetchServices(activePlace)

        return () => {
            setActiveService('')
            setFreeTerms([])
            setActiveTerm('')
            setOptions([])
            setActiveDate('')


        }

    }, [activePlace])

    return (
        <>
            <div className="reservation-form">
                {activePlace && <AutoScrollOnMount scrollTo={'.service-picker'} >{servicePicker(activePlace)}</AutoScrollOnMount>}
                {optionsLoading && <DataLoader text={'Wczytuję katalog usług...'} />}
                {activeService && <AutoScrollOnMount scrollTo={'.date-picker'}><div> {datePicker()} </div></AutoScrollOnMount>}
                {activeDate && (<AutoScrollOnMount scrollTo={'.time-picker'} >{timePicker()}</AutoScrollOnMount>)}
                {termsLoading && <DataLoader text={'Wczytuję dostępne terminy...'} />}
                {(activeDate && activePlace && activeTerm) && <AutoScrollOnMount scrollTo={'.guest-data'}><div>{guestData()}</div></AutoScrollOnMount>}
                {reservationSending && <DataLoader text={reservationSendingInfo} />}
            </div></>
    );
}

export default ReservationForm;