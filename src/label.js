const Label = (props) => {
    const { id, state, handlePlusMinus } = props

    return (
        <div id={id + "-label"} className="labels">
            {id} Length
            <p id={id + "-length"}>{state[id] / 60}</p>
            <div id={id + "-controls"} className="controls">
                <button
                    id={id + "-increment"}
                    onClick={() => handlePlusMinus('increment', id)}>
                    {id} Inc
                </button>
                <button
                    id={id + "-decrement"}
                    onClick={() => handlePlusMinus('decrement', id)}>
                    {id} Dec
                </button>
            </div>
        </div>
    )
}
export default Label