import '../styles/home-page.scss'
import frontvid from '../media/front-vid.mp4'
import TypingSpan from '../components/TypingSpan';
import { motion } from "framer-motion"
import { useRef } from 'react';
import placesadd from '../media/placesadd.png'
import logo from '../media/logosq600.png'
import clouds from '../media/clouds3.mp4'
import people from '../media/people.mp4'

import calendar from '../media/calendar.png'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import places1 from '../media/places-1.png'
import places2 from '../media/places-2.png'
import places3 from '../media/places-3.png'
import logoLayer1 from '../media/logo sq-1.png'
import logoLayer2 from '../media/logo sq-2.png'
import logoLayer3 from '../media/logo sq-3.png'
import logoLayer4 from '../media/logo sq-4.png'
import hours from '../media/workhours.png'
import addservices from '../media/services.png'



const HomePage = () => {

    const ref = useRef(null)

    return (
        <div className="home-page">
            <header>
                <div className='home-page-banner-vid'>
                    <video autoPlay={true} loop={true} muted={true} src={frontvid}></video>
                </div>
                <div className='home-page-overlay'>
                </div>
                <div className='typing-span-wrapper'><TypingSpan /></div>
            </header>

        </div >





    );
}

export default HomePage;



{/* <main>
                <section className='orange'>
                    <div className='logo-animation'>
                        <img src={logoLayer4} alt="" />
                        <img src={logoLayer4} alt="" />
                        <img src={logoLayer3} alt="" />
                        
                        <img src={logoLayer1} alt="" />
                    </div>
                    <div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}>

                            <p> <strong>BookIn</strong> to aplikacja która pomoże twojej firmie rozbudować oraz zoptymalizować rezerwację klientów. </p>


                        </motion.div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            viewport={{ once: true }}>
                            <p> <strong>Jakąkolwiek</strong> prowadzisz działalność, BookIn dostosuje się i ułatwi zarządzanie rezerwacjami w Twojej firmie.</p>
                        </motion.div>
                    </div>

                </section>
                <section className='blue'>


                    <div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}>

                            <p>
                                <strong> Posiadasz kilka placówek swojej firmy?</strong>
                            </p>



                        </motion.div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}>

                            <p> <strong>Nie ma sprawy!</strong> W BookIn możesz dodać wiele placówek w różnych miejscach!</p>


                        </motion.div>
                    </div>
                    <div>
                        <Splide
                            options={{
                                cover: true,
                                width: '100%',
                                heightRatio: 1,
                                arrows: false,
                                isNavigation: false,
                                autoplay: true,
                                interval: 3000,
                                rewind: true,
                                type: 'loop',
                                speed: 1000,
                                pagination: false,
                                drag: false
                            }}
                            className='places-splide-div'
                        >
                            <SplideSlide>
                                <img src={places1} alt="" />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={places2} alt="" />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={places3} alt="" />
                            </SplideSlide>
                        </Splide>
                    </div>
                </section>
                <section className='orange'>

                    <div>
                        <Splide
                            options={{
                                cover: true,
                                width: '100%',
                                heightRatio: 1,
                                arrows: false,
                                isNavigation: false,
                                autoplay: true,
                                interval: 3000,
                                rewind: true,
                                type: 'loop',
                                speed: 1000,
                                pagination: false,
                                drag: false
                            }}
                            className='places-splide-div'
                        >
                            <SplideSlide>
                                <img src={hours} alt="" />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={addservices} alt="" />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={calendar} alt="" />
                            </SplideSlide>
                        </Splide>
                    </div>
                    <div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}>
                            <p> <strong>Dodaj</strong> godziny pracy oraz katalog usług jak najszybciej. </p>
                        </motion.div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            viewport={{ once: true }}>
                            <p><strong>To proste!</strong>Możesz posiadać nieograniczoną ilość usług dostosowanych do możliwości twojej firmy.</p>
                        </motion.div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 2.5 }}
                            viewport={{ once: true }}>
                            <p> <strong>Zarządzaj</strong>Rezerwacjami klientów w łatwy sposób.</p>
                        </motion.div>




                    </div>
                </section>
                
            </main> */}