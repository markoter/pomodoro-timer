import { useRef } from "react"
import audio from "./timer-beep.wav"

const ClockComp = (props) => {
    const {time, sessionOn, countDown, reset} = props
    const currentCounting = sessionOn ? 'session' : 'break'

    const beepSound = useRef(null)
    return (
        <div id="clock">
            <p id="timer-label">{currentCounting}</p>
            <time id="time-left">{time}</time>
            <div id="controls">
                <button id="start_stop" onClick={countDown}>start/stop</button>
                <button id="reset" onClick={reset}>reset</button>
            </div>
            <audio id="beep" src={audio} ref={beepSound}/>
        </div>
    )
}
export default ClockComp