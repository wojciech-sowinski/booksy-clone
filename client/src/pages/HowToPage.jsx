//css
import '../styles/howto.scss'
import '../styles/buttons.scss'
import '@splidejs/react-splide/css';
//media
import frontvid from '../media/front-vid.mp4'
import placesAdd from '../media/placesadd.png'
import placeform from '../media/placeform.png'
import workhours from '../media/workhours.png'
import services from '../media/services.png'
import link from '../media/link.png'
import register from '../media/register.png'
//dependencies
import { motion, AnimatePresence } from "framer-motion"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useRef, useEffect, useState } from 'react';
//components
import RegisterButton from '../components/RegisterButton';


const HowToPage = () => {


    const splideRef = useRef(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [mounted, setMounted] = useState(false)



    const setActiveSlideHandle = (index) => {
        splideRef.current.go(index)
        setActiveSlide(index)
    }


    const slidesNavRender = () => {
        const slides = document.querySelectorAll('.splide__slide')
        const buttons = [...slides].map((slide, index) => {
            return (
                <button key={index}
                    className={`slidesNav ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => { setActiveSlideHandle(index) }}
                ><span>{`${index + 1}`}</span></button>
            )
        })
        return buttons
    }


    useEffect(() => {


    }, [activeSlide])

    return (
        <div className="how-to-page">

            <main>
                <div className='home-page-banner-vid'>
                    <video autoPlay={true} loop={true} muted={true} src={frontvid}></video>
                </div>
                <div className='home-page-overlay'>
                </div>
                <div className='how-to-info'>
                    <div className="step-nav">

                        {mounted && slidesNavRender()}
                    </div>

                    <Splide
                        ref={splideRef}
                        onMounted={() => { setMounted(true) }}
                        onDragged={(Splide) => {
                            setTimeout(() => {
                                setActiveSlideHandle(Splide.index);
                            }, 500);
                        }}
                        onMoved={(Splide) => {
                            setTimeout(() => {
                                setActiveSlideHandle(Splide.index);
                            }, 500);
                        }}

                        options={{
                            rewind: false,
                            pagination: false,
                            arrows: true,
                            gap: '1rem',

                        }}
                        aria-label="My Favorite Images">

                        <SplideSlide>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                className='how-to-card'
                            >
                                <div>
                                    <p>
                                        <strong> To proste!</strong>
                                    </p>
                                    <p>
                                        Załóż swój darmowy profil.
                                    </p>
                                    <RegisterButton />
                                </div>
                                <div>
                                    <motion.img
                                        initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                        whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        viewport={{ once: true }}
                                        src={register}
                                        alt="register form image" />
                                </div>
                            </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                className='how-to-card'
                            >
                                <div>
                                    <p>
                                        <strong> Dodaj swoje miejsca.</strong>
                                    </p>
                                    <p>
                                        Zaloguj się na swój profil.
                                    </p>
                                    <p>
                                        Dodawaj miejsca bez limitu!
                                    </p>
                                </div>
                                <div>
                                    <motion.img
                                        initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                        whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        viewport={{ once: true }}
                                        src={placesAdd}
                                        alt="places select list image" />
                                </div>
                            </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                className='how-to-card'
                            >

                                <div>
                                    <p>
                                        <strong> Dobrze Ci idzie!</strong>
                                    </p>
                                    <p>
                                        Każde miejsce może mieć swoje unikalne dane adresowe.
                                    </p>
                                    <p>
                                        Wypełnij je!
                                    </p>
                                </div>
                                <div>
                                    <motion.img
                                        initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                        whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        viewport={{ once: true }}
                                        src={placeform}
                                        alt="your place form image" />
                                </div>
                            </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                className='how-to-card'
                            >
                                <div>
                                    <p>
                                        <strong>Już prawie gotowe!</strong>
                                    </p>
                                    <p>
                                        Przed Tobą dwa ostatnie kroki.
                                    </p>
                                    <p>
                                        Dodaj godziny pracy swojej placówki.
                                    </p>
                                    <p>
                                        Godziny pracy każdej placówki możesz dostosować do własnych potrzeb.
                                    </p>
                                </div>
                                <div>
                                    <motion.img
                                        initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                        whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        viewport={{ once: true }}
                                        src={workhours}
                                        alt="your place work hours image" />
                                </div>
                            </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                className='how-to-card'
                            >

                                <div>
                                    <p>
                                        <strong>Czegoś nam tu jeszcze brakuje?</strong>
                                    </p>
                                    <p>
                                        Tak!
                                    </p>
                                    <p>
                                        To Twoje usługi, które chcesz udostępnić swoim klientom. Możesz je dodawać i edytować w prosty sposób.
                                    </p>
                                    <p>
                                        Wystarczy je dodać do listy.
                                    </p>
                                </div>
                                <div>
                                    <motion.img
                                        initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                        whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        viewport={{ once: true }}
                                        src={services}
                                        alt="your place work hours image" />
                                </div>
                            </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                className='how-to-card'
                            >
                                <div>
                                    <p>
                                        <strong>Mamy to!</strong>
                                    </p>
                                    <p>
                                        Wszystko przygotowane!
                                    </p>
                                    <p>
                                        W zakładce API/LINKI został stworzony unikalny link przypisany do twojego miejsca.
                                    </p>
                                    <p>
                                        Skopuj link na swoją stone jako odnośnik i udostępnij możliwość rezerwacji swoim klientom!
                                    </p>
                                    <a href='http://bookin.owliedev.pl/addreservation?place=63b2e169c0a6825b4e7e4110' >Wypróbuj przykładową rezerwację!</a>
                                </div>
                                <div>
                                    <motion.img
                                        initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                        whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        viewport={{ once: true }}
                                        src={link}
                                        alt="your place link image" />
                                </div>
                            </motion.div>
                        </SplideSlide>

                    </Splide>




                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <p>
                                <strong> To proste!</strong>
                            </p>
                            <p>
                                Załóż swój darmowy profil.
                            </p>
                            <RegisterButton />
                        </div>
                        <div>
                            <motion.img
                                initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                src={register}
                                alt="register form image" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <p>
                                <strong> Dodaj swoje miejsca.</strong>
                            </p>
                            <p>
                                Zaloguj się na swój profil.
                            </p>
                            <p>
                                Dodawaj miejsca bez limitu!
                            </p>
                        </div>
                        <div>
                            <motion.img
                                initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                src={placesAdd}
                                alt="places select list image" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                         className='how-to-card'
                    >
                        <div>
                            <motion.img
                                initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                src={placeform}
                                alt="your place form image" />
                        </div>
                        <div>
                            <p>
                                <strong> Dobrze Ci idzie!</strong>
                            </p>
                            <p>
                                Każde miejsce może mieć swoje unikalne dane adresowe.
                            </p>
                            <p>
                                Wypełnij je!
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                         className='how-to-card'
                    >
                        <div>
                            <p>
                                <strong>Już prawie gotowe!</strong>
                            </p>
                            <p>
                                Przed Tobą dwa ostatnie kroki.
                            </p>
                            <p>
                                Dodaj godziny pracy swojej placówki.
                            </p>
                            <p>
                                Godziny pracy każdej placówki możesz dostosować do własnych potrzeb.
                            </p>
                        </div>
                        <div>
                            <motion.img
                                initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                src={workhours}
                                alt="your place work hours image" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                         className='how-to-card'
                    >
                        <div>
                            <motion.img
                                initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                src={services}
                                alt="your place work hours image" />
                        </div>
                        <div>
                            <p>
                                <strong>Czegoś nam tu jeszcze brakuje?</strong>
                            </p>
                            <p>
                                Tak!
                            </p>
                            <p>
                                To Twoje usługi, które chcesz udostępnić swoim klientom. Możesz je dodawać i edytować w prosty sposób.
                            </p>
                            <p>
                                Wystarczy je dodać do listy.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                         className='how-to-card'
                    >
                        <div>
                            <p>
                                <strong>Mamy to!</strong>
                            </p>
                            <p>
                                Wszystko przygotowane!
                            </p>
                            <p>
                                W zakładce API/LINKI został stworzony unikalny link przypisany do twojego miejsca.
                            </p>
                            <p>
                                Skopuj link na swoją stone jako odnośnik i udostępnij możliwość rezerwacji swoim klientom!
                            </p>
                            <a href='http://bookin.owliedev.pl/addreservation?place=63b2e169c0a6825b4e7e4110' >Wypróbuj przykładową rezerwację!</a>
                        </div>
                        <div>
                            <motion.img
                                initial={{ scale: 0, rotate: 0, borderRadius: 500 }}
                                whileInView={{ scale: 1, rotate: 1440, borderRadius: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                viewport={{ once: true }}
                                src={link}
                                alt="your place link image" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                         className='how-to-card'
                    >
                        <div>
                            <p>
                                <strong>To było proste. Prawda?</strong>
                            </p>
                            <p>
                                Zacznij korzystać już dziś!
                            </p>
                            <p>
                                Zapraszamy.
                            </p>
                        </div>
                    </motion.div> */}
                </div>
            </main >
        </div >
    );
}

export default HowToPage;