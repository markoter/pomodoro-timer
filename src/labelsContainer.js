import { useReducer } from "react"
import Label from "./label"




const LabelsContainer = (props) => {
    const { state, handlePlusMinus, returnMinutes } = props

    return (
        <div id="labels-part">
            <Label
                id={'session'}
                state={state}
                handlePlusMinus={handlePlusMinus}
                returnMinutes={returnMinutes}
            />
            <Label
                id={'break'}
                state={state}
                handlePlusMinus={handlePlusMinus}
                returnMinutes={returnMinutes}
            />

        </div>
    )
}

export default LabelsContainer