import audio from "./timer-beep.wav"
import { forwardRef } from "react"
import CircularProgressBar from "./circularProgressBar"

const ClockComp = (props, ref) => {
    const { timer, timerFull, showTime, sessionOn, countDown, reset } = props
    const currentCounting = sessionOn ? 'session' : 'break'

    return (
        <div id="clock">
            <CircularProgressBar 
            size={250} 
            strokeWidth={20}
            color="green"
            timer={timer}
            timerFull={timerFull}
            showTime={showTime}
            />

            <p id="timer-label">{currentCounting}</p>
            <div id="controls">
                <button id="start_stop" onClick={countDown}>start/stop</button>
                <button id="reset" onClick={reset}>reset</button>
            </div>
            <audio id="beep" src={audio} ref={ref} />
        </div>
    )
}
export default forwardRef(ClockComp)