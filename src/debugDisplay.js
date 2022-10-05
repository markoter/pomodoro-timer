const DebugDisplay = (props) => {
    const { state, playAudio } = props
    return (
        <div id="debugDisplay">
            <p>break time is: {state.break}</p>
            <p>session time is: {state.session}</p>
            <p>timer is: {state.timer}</p>
            <p>countingOn is: {state.countingOn.toString()}</p>
            <p>sessionOn is: {state.sessionOn.toString()}</p>
            <button onClick={playAudio}>Play Debug</button>

        </div>
    )
}

export default DebugDisplay