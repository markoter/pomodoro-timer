import { useEffect, useState, useReducer } from "react";
import LabelsContainer from "./labelsContainer";
//reducer part
const initalState = { Session: 1500, Break: 300, Timer: 1500}

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
  const [breakLen, changeBreakLen] = useState(300)
  const [sessionLen, changeSessionLen] = useState(1500)
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

  const sessionInc = () => {
    if (sessionLen < 3600 && timeCount < 3600) {
      changeSessionLen(sessionLen + 60)
      changeTimeCount(timeCount + 60)
    }
  }
  const sessionDec = () => {
    if (sessionLen > 0 && timeCount > 0) {
      changeSessionLen(sessionLen - 60)
      changeTimeCount(timeCount - 60)
    }
  }
  const breakInc = () => {
    if (breakLen < 3600) {
      changeBreakLen(breakLen + 60)
    }
  }
  const breakDec = () => {
    if (breakLen > 0) {
      changeBreakLen(breakLen - 60)
    }
  }
  const reset = () => {
    countSwitchOnOff(false)
    changeTimeCount(1500)
    dispatch({type: 'reset'})
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
        dispatch({type: 'decrement', property: 'Timer'})
      }
    }, 100)
    return () => clearInterval(counter)
  }, [timeCount, countSwitch, sessionSwitch])

  return (
    <div id="app">
      This is app
      <div id="timer-label">
        Session
        <time id="time-left">{showTime(timeCount)}</time>
        <div id="controls">
          <button id="start_stop" onClick={countDown}>start/stop</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
      </div>
      <LabelsContainer
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
