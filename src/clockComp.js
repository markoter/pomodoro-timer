import audio from "./timer-beep.wav"
import { forwardRef } from "react"
import CircularProgressBar from "./circularProgressBar"

const ClockComp = (props, ref) => {
    const { time, sessionOn, countDown, reset } = props
    const currentCounting = sessionOn ? 'session' : 'break'

    return (
        <div id="clock">
            <div id="pomodoro-circle-out">
                <div id="pomodoro-progress">
                    <div id="pomodoro">
                        <time id="time-left">{time}</time>
                    </div>
                </div>
            </div>
            <CircularProgressBar 
            size={250} 
            strokeWidth={20}
            percentage={25}
            color="green"
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