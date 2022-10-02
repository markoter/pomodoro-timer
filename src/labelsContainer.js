import { useReducer } from "react"
import Label from "./label"




const LabelsContainer = (props) => {
    const { state, handlePlusMinus } = props

    return (
        <div id="labels-part">
            <Label
                id={'Session'}
                state={state}
                handlePlusMinus={handlePlusMinus}
            />
            <Label
                id={'Break'}
                state={state}
                handlePlusMinus={handlePlusMinus}
            />

        </div>
    )
}

export default LabelsContainer