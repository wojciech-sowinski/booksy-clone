import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import logo from '../media/logohor600.png'
import { motion } from "framer-motion"
const TypingSpan = () => {

    const [showLogo, setShowLogo] = useState(false)
    const [typingTopPos, setTypingTopPos] = useState('30%')

    return (<>
        < div className="typing-span" style={{ top: typingTopPos, textAlign: 'center' }}>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Prowadzisz restaurację?")
                        .pauseFor(100)
                        .deleteAll()
                        .typeString("Salon piękności?")
                        .pauseFor(50)
                        .deleteAll()
                        .typeString("A może SPA?")
                        .pauseFor(50)
                        .deleteAll()
                        .typeString("Sprawdź jak łatwo dokonać rezerwacji. ")
                        .pauseFor(50)
                        .typeString("<strong>Sprawdź!</strong>")
                        .callFunction(() => {
                            setShowLogo(true)
                        })
                        .start();
                }}
            />
            {showLogo && <motion.div initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}><img src={logo} alt="logo" /></motion.div>}
        </div ></>
    );
}

export default TypingSpan;