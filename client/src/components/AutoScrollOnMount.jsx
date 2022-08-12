import { useEffect, forwardRef, createRef, Fragment, useRef } from "react";

const AutoScrollOnMount = ({ children, scrollTo }) => {


    useEffect(() => {
        document.querySelector(scrollTo).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    }, [])

    return (
        <>
            {children}
        </>
    )
};

export default AutoScrollOnMount;

