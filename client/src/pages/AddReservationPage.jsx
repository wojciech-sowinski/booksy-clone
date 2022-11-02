import { useState } from "react";
import { useEffect, useRef, createRef } from "react";
import Select from 'react-dropdown-select';
import '../styles/servicePicker.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import AutoScrollOnMount from "../components/AutoScrollOnMount";
import DataLoader from "../components/DataLoader";
import axios from "axios";
import config from "../config";
import { BallTriangle, ProgressBar } from 'react-loader-spinner'
import '../styles/DataLoader.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot, faAt, faPhoneVolume, faArrowRight, faChevronLeft, faStepBackward
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion"



const ReservationPage = () => {

    const daysOfWeek = [
        "niedziela",
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota",
    ];

    const [activePlace, setActivePlace] = useState('')
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
    const [reservationSend, setReservationSend] = useState(false)
    const [activeStep, setActiveStep] = useState(0)


    const [placeData, setPlaceData] = useState({})

    const fetchPlaceData = async (activePlace) => {
        setOptionsLoading(true)
        await axios.get(config.serverUrl + 'pplace', {
            params: {
                activePlace
            }
        })
            .then(resolve => {

                if (resolve.data.success) {
                    setPlaceData(resolve.data.place)
                }
            })
    }

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
                    }).sort((a, b) => {
                        const nameA = a.label.toUpperCase();
                        const nameB = b.label.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
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
                setReservationSending(false)
                setReservationSend(true)
            }
        })
    }

    const guestData = () => {
        return (<motion.div
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: .5 }}
            className="guest-data-wrapper">
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

                    <label htmlFor="consent-check"><input checked={guestConsent} onChange={(e) => setGuestConsent(e.currentTarget.checked)} type="checkbox" name="consent" id="consent-check" required /> Oświadczam, że zapoznałem się z regulaminem oraz wyrażam zgodę na użycie moich danych w celu przetwarzania rezerwacji.</label>
                </div>
                <div>
                    <button type="submit">Rezerwuj</button>
                </div>

            </form>
        </motion.div>)
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
        setActiveStep(3)
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
                        setActiveStep(2)

                    }, 500);
                }
            })
    }

    const timePicker = () => {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 90 }}
                    transition={{ duration: .5 }}
                    className="time-picker-wrapper">
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
                        </Splide></> : <div className="term-info"><span >Brak wolnych terminów w wybranym dniu</span><div>{backButton('Wróć do wyboru daty')}</div></div>}

                    </div>

                </motion.div>

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
            <motion.div
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: .5 }}
                className="date-picker-wrapper">
                <span><span className="number">2</span>Wybierz datę:</span>
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
                                isNavigation: true,
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
            </motion.div >
        )
    }

    const servicePicker = (activePlace) => {

        return (<motion.div
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: .5 }}
            className="service-picker">
            <span ><span className="number">1</span> Wybierz usługę:</span>
            <Select
                placeholder='wybierz usługę...'
                closeOnSelect
                options={options}
                required
                searchable={false}
                dropdownPosition='auto'
                noDataRenderer={() => 'Brak usług...'}
                onChange={(values) => {
                    setActiveService(values[0]?._id)
                    setActiveStep(1)
                }}
                onClearAll={(values) => setActiveService('')}
                itemRenderer={({ item, methods }) => (<div onClick={() => methods.addItem(item)} className="option-div">
                    <span className="place-title">{item.name}</span>
                    <div><span className="place-info"> Czas trwania: {item.duration} min.</span><span className="place-info"> Koszt: {item.price}pln</span></div>
                </div>)}
            />
        </motion.div>)
    }

    const placeDataRender = () => {
        return (

            <div className="place-data">
                {/* <span>Dokonujesz rezerwacji w:</span> */}
                <div>
                    <span> <strong>{placeData.name}</strong></span>
                </div>
                <div>
                    <span> <FontAwesomeIcon icon={faLocationDot} /> {placeData.street} </span>
                    <span>{placeData.houseNumber}, </span>
                    <span>{placeData.postalCode} </span>
                    <span>{placeData.city} </span>
                </div>

                <div>
                    <span> <FontAwesomeIcon icon={faAt} /> {placeData.email} </span>

                </div>
                <div>
                    <span> <FontAwesomeIcon icon={faPhoneVolume} /> {placeData.phone} </span>

                </div>
            </div>


        )
    }

    const reservationSendInfo = () => {

        // setActiveStep(0)

        return (
            <div className='data-loader '>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"

                    wrapperClass="progress-bar-wrapper"
                    borderColor='#e79c6a'
                    barColor='#3dbda5'
                />
                <p>
                    <span> <strong>Twoja rezerwacja została wysłana.</strong> </span>
                </p>
                <p>
                    <span>Potwierdzenie otrzymasz na wskazany adres email.</span>
                </p>
                <p>
                    <span>Dziękujemy za skorzystanie z naszych usług.</span>
                </p>
                <button onClick={() => { window.history.go(-1) }}>Wróć do poprzedniej strony</button>
            </div>
        )


    }
    const suspendInfo = () => {
        return (
            <div className='data-loader'>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperClass="progress-bar-wrapper"
                    borderColor='red'
                    barColor='red'
                />
                <p>
                    <span> <strong>Aktualnie wybrany salon nie obsługuje rezerwacji.</strong> </span>
                </p>
                <p>
                    <span>Przepraszamy za niedogodności.</span>
                </p>
                <p>
                    <span>Dziękujemy za skorzystanie z naszych usług!</span>
                </p>
                <button onClick={() => { window.history.go(-1) }}>Wróć do poprzedniej strony</button>
            </div>
        )
    }

    const backButton = (text = 'Poprzedni krok') => {

        return (
            <>
                <AnimatePresence>
                    {(activeStep > 0) &&
                        <motion.button
                            initial={{ opacity: 0, rotateX: 90 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            exit={{ opacity: 0, rotateX: 90 }}
                            transition={{ duration: .5 }}
                            onClick={() => { setActiveStep(prev => prev - 1) }}
                            className="back-button">
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <span>{text}</span>
                        </motion.button>
                    }
                </AnimatePresence>
            </>
        )
    }


    const stepNavigation = () => {

        return (
            <>
                <div className="step-nav">
                    <button
                        onClick={() => { setActiveStep(0) }}
                        className={`set-step-button ${activeStep === 0 && 'active'} `}><span>1</span> Wybierz usługę</button>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <button
                        onClick={() => { setActiveStep(1) }}
                        className={`set-step-button ${activeStep === 1 && 'active'} `}
                        disabled={activeStep < 1} ><span>2</span> Wybierz datę</button>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <button
                        onClick={() => { setActiveStep(2) }}
                        className={`set-step-button ${activeStep === 2 && 'active'} `}
                        disabled={activeStep < 2}><span>3</span> Wybierz czas</button>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <button
                        onClick={() => { setActiveStep(3) }}
                        className={`set-step-button ${activeStep === 3 && 'active'} `}
                        disabled={activeStep < 3}><span>4</span> Podaj swoje dane</button>
                </div>
                <div className="back-button-wrapper">

                    {backButton()}
                </div>
            </>
        )

    }

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const place = urlParams.get('place')
        setActivePlace(place)

        if (activePlace) {
            fetchPlaceData(activePlace)
            fetchServices(activePlace)
        }
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
                {activePlace && placeDataRender()}
                {stepNavigation()}
                {!placeData.suspend && !reservationSend && optionsLoading && <DataLoader text={'Wczytuję katalog usług...'} />}

                {activeStep === 0 && !placeData.suspend && !reservationSend && activePlace && servicePicker(activePlace)}

                {activeStep === 1 && !placeData.suspend && !reservationSend && activeService && <AutoScrollOnMount scrollTo={'.date-picker'}>{datePicker()}</AutoScrollOnMount>}
                {!placeData.suspend && !reservationSend && termsLoading && <DataLoader text={'Wczytuję dostępne godziny...'} />}
                {activeStep === 2 && !placeData.suspend && !reservationSend && activeDate && <AutoScrollOnMount scrollTo={'.time-picker'}>{timePicker()}</AutoScrollOnMount>}
                {activeStep === 3 && (activeDate && activePlace && activeTerm) && <AutoScrollOnMount scrollTo={'.guest-data'}>{guestData()}</AutoScrollOnMount>}
                {!placeData.suspend && !reservationSend && reservationSending && <DataLoader text={reservationSendingInfo} />}
                {placeData.suspend && suspendInfo()}
                {reservationSend && reservationSendInfo()}
            </div>
        </>
    );
}

export default ReservationPage;