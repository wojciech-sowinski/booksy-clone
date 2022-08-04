import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-dropdown-select';
import '../styles/servicePicker.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide';
const ReservationForm = ({ activePlace }) => {


    const daysOfWeek = [
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota",
        "niedziela",
    ];

    const [activeService, setActiveService] = useState('')
    const [activeDate, setActiveDate] = useState('')
    const { services, loading } = useSelector(
        (state) => state.servicesReducer
    );
    const dispatch = useDispatch();

    const options = services.map(service => {
        return {
            ...service, label: `${service.name}`, value: service._id
        }
    })

    const formatTimeComponent = (number) => {
        return number.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    };

    const pickDateHandle = (e, date) => {
        setActiveDate(date)
        const daysToResetClass = document.querySelectorAll('.day')
        daysToResetClass.forEach(day => day.classList.remove('active'))
        e.currentTarget.className += " active"
    }

    const datePicker = () => {



        const date = new Date()

        const days = []

        for (let i = 0; i < 30; i++) {
            date.setDate(date.getDate() + 1)

            const fullDateToSet = date.getFullYear() + '-' + formatTimeComponent(date.getMonth() + 1) + '-' + formatTimeComponent(date.getDate())
            console.log();
            days.push((<SplideSlide className="day" key={fullDateToSet} onClick={(e) => { pickDateHandle(e, fullDateToSet) }}>
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
                </div></>
        )


    }

    useEffect(() => { console.log('render'); }, [activeService, activePlace, activeDate])

    return (
        <>

            <form>
                <span><span className="number">1</span> Wybierz usługę:</span>
                <Select
                    separator
                    placeholder='wybierz usługę...'
                    clearable
                    options={options}
                    required
                    onChange={(values) => setActiveService(values[0]?._id)}
                    onClearAll={(values) => setActiveService('')}
                    itemRenderer={({ item, methods }) => (<div onClick={() => methods.addItem(item)} className="option-div">
                        <span className="place-title">{item.name}</span>
                        <div><span className="place-info"> Czas trwania: {item.duration} min.</span><span className="place-info"> Koszt: {item.price}pln</span></div>
                        {item.description && <span className="place-info"> Opis: {item.description}</span>}
                    </div>)}
                />
                {activeService && datePicker()}
                {activeDate && <div><span>{activeDate}</span></div>}

                {/* <div>
                    <input type="text" name='firstName' placeholder="Imię" required />
                    <input type="text" name='lastName' placeholder="Nazwisko" required />
                </div>
                    <div><input type="email" name="email" required placeholder="Email" /></div> */}



            </form></>
    );
}

export default ReservationForm;