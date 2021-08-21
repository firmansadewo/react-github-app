import { useState, useEffect, useRef } from "react"
import arrow from '../../../assets/img/arrow.svg'
import './slider.css'

const Slider = ({ data }) => {
    const refs = useRef(null)
    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(refs && refs?.current?.offsetWidth >= refs?.current?.scrollWidth ? true : false)

    const checkButton = (offsetWidthVal, scrollWidthVal) => {
        setDisablePrev(refs?.current?.scrollLeft <= 80 ? true : false)
        setDisableNext(refs?.current?.scrollLeft + offsetWidthVal >= scrollWidthVal - 50 ? true : false)
    }

    useEffect(() => {
        checkButton(refs?.current?.offsetWidth, refs?.current?.scrollWidth)
    })

    let offsetWidthVal = refs?.current?.offsetWidth
    let scrollWidthVal = refs?.current?.scrollWidth

    return (
        <div ref={el => refs.current = el} className="slider-container">
            {/* section button prev */}
            <div
                className={`btn prev ${disablePrev ? 'disable' : ''}`}
                disabled={disablePrev}
                onClick={() => {
                    refs.current.scrollLeft -= offsetWidthVal ? offsetWidthVal / 15 : 70;
                    checkButton(offsetWidthVal, scrollWidthVal);
                }}
            >
                <img className="slider-arrow" src={arrow} alt="prev" />
            </div>


            <div className="slider-wrapper">
                {data}
            </div>


            {/* section button next */}
            <div
                className={`btn next ${disableNext ? 'disable' : ''}`}
                disabled={disableNext}
                onClick={() => {
                    refs.current.scrollLeft += offsetWidthVal ? offsetWidthVal / 15 : 70;
                    checkButton(offsetWidthVal, scrollWidthVal);
                }}
            >
                <img className="slider-arrow next-arrow" src={arrow} alt="next" />
            </div>
        </div>
    )
}

export default Slider