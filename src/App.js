import { useEffect, useState, useReducer } from "react";
import LabelsContainer from "./labelsContainer";
import TimerComp from "./timerComp";
//reducer part
const initalState = { Session: 1500, Break: 300, Timer: 1500 }

const reducer = (state, action) => {
  let tempState = { ...state }
  const minute = 60
  const maxCount = 3600
  const minCount = 0
  switch (action.type) {
    case 'increment':
      tempState[action.property] = state[action.property] + minute
      return tempState[action.property] > maxCount ? state : tempState
    case 'decrement':
      tempState[action.property] = state[action.property] - minute
      return tempState[action.property] < minCount ? state : tempState
    case 'reset':
      return initalState
  }

}
function App() {
  //state
  const [timeCount, changeTimeCount] = useState(1500)
  const [countSwitch, countSwitchOnOff] = useState(false)
  const [sessionSwitch, changeSessionOnOff] = useState(true)

  //usereducer part
  const [state, dispatch] = useReducer(reducer, initalState)
  const handlePlusMinus = (actionType, actionProperty) => {

    dispatch({ type: actionType, property: actionProperty })
  }

  //buttons onClicks
  const countDown = () => {
    console.log("countDown clicked")
    countSwitchOnOff(!countSwitch)
  }

  const reset = () => {
    countSwitchOnOff(false)
    changeTimeCount(1500)
    dispatch({ type: 'reset' })
  }

  //formating as time
  const returnMinutes = (time) => {
    return Math.floor(time / 60)
  }

  const showTime = (time) => {
    const minutes = returnMinutes(time)
    const seconds = time - minutes * 60
    const showMinutes = minutes.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
    const showSeconds = seconds.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
    return showMinutes + ':' + showSeconds
  }

  useEffect(() => {
    const counter = setInterval(() => {

      if (countSwitch) {
        if (state.Timer <= 0) {
          changeSessionOnOff(!changeSessionOnOff)
          // if (sessionSwitch) {
          //   changeTimeCount(sessionLen)
          // }
          // else {
          //   changeTimeCount(breakLen)
          // }
        }
        dispatch({ type: 'decrement', property: 'Timer' })
      }
    }, 100)
    return () => clearInterval(counter)
  }, [timeCount, countSwitch, sessionSwitch])

  return (
    <div id="app">
      This is app
      <TimerComp
        time={showTime(state.Timer)}
        countDown={countDown}
        reset={reset}
      />
      <LabelsContainer
        returnMinutes={returnMinutes}
        state={state}
        handlePlusMinus={handlePlusMinus}
      />
      <div id="debug">
        <p>Break time is: {state.Break}</p>
        <p>Session time is: {state.Session}</p>
        <p>timeCount is: {timeCount}</p>
        <p>Timer is: {state.Timer}</p>
        <p>countSwitch is: {countSwitch.toString()}</p>
        <p>sessionSwitch is: {sessionSwitch.toString()}</p>
      </div>

    </div>
  );
}

export default App;
