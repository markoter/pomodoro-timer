const DebugDisplay = (props) => {
    const { state } = props
    return (
        <div id="debugDisplay" className="hidden">
            <p>break time is: {state.break}</p>
            <p>session time is: {state.session}</p>
            <p>timer is: {state.timer}</p>
            <p>countingOn is: {state.countingOn.toString()}</p>
            <p>sessionOn is: {state.sessionOn.toString()}</p>
        </div>
    )
}

export default DebugDisplay