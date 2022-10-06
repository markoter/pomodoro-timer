import audio from "./timer-beep.wav"

const ClockComp = (props, ref) => {
    const {time, sessionOn, countDown, reset} = props
    const currentCounting = sessionOn ? 'session' : 'break'

    return (
        <div id="clock">
            <p id="timer-label">{currentCounting}</p>
            <time id="time-left">{time}</time>
            <div id="controls">
                <button id="start_stop" onClick={countDown}>start/stop</button>
                <button id="reset" onClick={reset}>reset</button>
            </div>
            <audio id="beep" src={audio} ref={ref}/>
        </div>
    )
}
export default ClockComp