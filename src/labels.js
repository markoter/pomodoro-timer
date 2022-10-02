import { useReducer } from "react"
import Label from "./label"
const initalState = { Session: 1500, Break: 300}

const reducer = (state, action) => {
    let tempState = { ...state }
    const minute = 60
    const maxCount = 3600
    const minCount = 0
    switch (action.type) {
        case 'increment':
            tempState[action.property] =  state[action.property] + minute 
            return tempState[action.property] > maxCount ? state : tempState
        case 'decrement':
            tempState[action.property] = state[action.property] - minute 
            return tempState[action.property] < minCount ? state : tempState
        case 'reset':
            return initalState
    }

}


const LabelsPart = () => {
    const [state, dispatch] = useReducer(reducer, initalState)
    const handlePlusMinus = (actionType, actionProperty) => {

        dispatch({ type: actionType, property: actionProperty})
    }
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

export default LabelsPart