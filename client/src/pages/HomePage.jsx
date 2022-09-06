import '../styles/home-page.scss'
import frontvid from '../media/front-vid.mp4'
import TypingSpan from '../components/TypingSpan';
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from 'react';
import placesadd from '../media/placesadd.png'
import logo from '../media/logosq600.png'
import clouds from '../media/clouds3.mp4'
import people from '../media/people.mp4'
import workhours from '../media/workhours.png'
import services from '../media/services.png'
import calendar from '../media/calendar.png'
import { Splide, SplideSlide } from '@splidejs/react-splide';


const HomePage = () => {


    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <div className="home-page">
            <header>
                <div className='home-page-banner-vid'>

                    <video autoPlay={true} loop={true} muted={true} src={frontvid}></video>
                </div>
                <div className='home-page-overlay'>

                </div>
                <div><TypingSpan /></div>

            </header>
            <main>
                <section >
                    <div className='back-video'>
                        <video autoPlay={true} loop={true} muted={true} src={clouds}></video>
                        <div className='cloud-overlay'></div>
                    </div>

                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}

                        viewport={{ once: true }}> <img src={logo} alt="" />

                    </motion.div>

                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1 }}

                        viewport={{ once: true }}

                        className={'dark blue'}>
                        <p> <strong>BookIn</strong> to aplikacja która pomoże twojej firmie rozbudować oraz zoptymalizować rezerwację klientów. </p>
                        <p> <strong>Jakąkolwiek</strong> prowadzisz działalność, BookIn dostosuje się i ułatwi zarządzanie rezerwacjami w Twojej firmie.</p>

                    </motion.div>
                </section>
                <section>
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1 }}

                        viewport={{ once: true }}
                        className={'dark orange'}>
                        <p>
                            <strong> Posiadasz kilka placówek swojej firmy?</strong>
                        </p>
                        <p> <strong>Nie ma sprawy!</strong> W BookIn możesz dodać wiele placówek w różnych miejscach!</p>
                    </motion.div>
                    <div>
                        <img src={placesadd} alt="" />
                    </div>
                </section>
                <section className='services-hours'>
                    <div className='back-video'>
                        <video autoPlay={true} loop={true} muted={true} src={people}></video>
                        <div className='cloud-overlay'></div>
                    </div>



                    <motion.div ref={ref}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}

                        viewport={{ once: true }}>
                        <img src={workhours} alt="" />
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: '10%' }}
                            transition={{ duration: 1, delay: 1 }}

                            viewport={{ once: true }}

                            className={'dark blue'}>
                            <p> <strong>Pokaż swoim klientom, że jesteś dostępny!</strong> Każde Twoje miejsce może posiadać różne godziny otwarcia i katalog usług.</p>

                            <p><strong>Dostosuj</strong>Godziny pracy do potrzeb swoich oraz klientów.</p>



                        </motion.div>
                    </motion.div>










                </section>
                <section className='services-hours'>
                    <div className='back-video'>
                        <video autoPlay={true} loop={true} muted={true} src={people}></video>
                        <div className='cloud-overlay'></div>
                    </div>




                    <motion.div ref={ref}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}

                        viewport={{ once: true }}>
                        <img src={services} alt="" />
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: '0%' }}
                            whileInView={{ opacity: 1, x: 100 }}
                            transition={{ duration: 2, delay: 1 }}

                            viewport={{ once: true }}

                            className={'dark orange'}>

                            <p> <strong>Dodaj</strong> godziny pracy oraz katalog usług jak najszybciej. </p>

                            <p><strong>To proste!</strong>Możesz posiadać nieograniczoną ilość usług dostosowanych do możliwości twojej firmy.</p>


                        </motion.div>
                    </motion.div>








                </section>
                <section className='calendar-demo'>
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}

                        viewport={{ once: true }}>

                        <img src={calendar} alt="" />
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: '10%' }}
                            transition={{ duration: 2, delay: 2 }}

                            viewport={{ once: true }}

                            className={'dark blue'}>
                            <p> <strong>Zarządzaj</strong>Rezerwacjami klientów w łatwy sposób.</p>
                            <p> <strong>Kontroluj</strong>Dokonane rezerwacje w wygodnym widoku całego miesiąca. </p>



                        </motion.div>
                    </motion.div>
                </section>
            </main>
        </div >
    );
}

export default HomePage;