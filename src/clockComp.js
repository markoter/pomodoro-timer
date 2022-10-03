const ClockComp = (props) => {
    const {time, countDown, reset} = props
    return (
        <div id="timer-label">
            Session
            <time id="time-left">{time}</time>
            <div id="controls">
                <button id="start_stop" onClick={countDown}>start/stop</button>
                <button id="reset" onClick={reset}>reset</button>
            </div>
        </div>
    )
}
export default ClockComp