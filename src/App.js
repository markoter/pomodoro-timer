import { useEffect, useReducer, useState } from "react";


const initLens = [
  {
    name: "session",
    time: 1500
  },
  {
    name: "break",
    time: 300
  }
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      if (timeSet.name === action.name) {
        return state.time + 60
      }
      else {
        return timeSet
      }
    case 'decrement':
      if (timeSet.name === action.name) {
        return state.time - 60
      }
      else {
        return timeSet
      }
    default:
      return state
  }
}

function App() {
  //state
  const [breakLen, changeBreakLen] = useState(300)
  const [sessionLen, changeSessionLen] = useState(1500)
  const [timeCount, changeTimeCount] = useState(1500)
  const [countSwitch, countSwitchOnOff] = useState(false)
  const [sessionSwitch, changeSessionOnOff] = useState(true)


  const [timeSets, dispatch] = useReducer(reducer, initLens)


  //buttons onClicks
  const countDown = () => {
    console.log("countDown clicked")
    countSwitchOnOff(!countSwitch)
  }

  const handleIncrease = (timeSet) => {
    dispatch: ({ type: 'increment', name: timeSet.name })
  }
  const handleDecrease = (timeSet) => {
    dispatch: ({ type: 'decrement', name: timeSet.name })
  }
  
  const reset = () => {
    countSwitchOnOff(false)
    changeBreakLen(300)
    changeSessionLen(1500)
    changeTimeCount(1500)
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
        if (timeCount <= 0) {
          changeSessionOnOff(!changeSessionOnOff)
          if (sessionSwitch) {
            changeTimeCount(sessionLen)
          }
          else {
            changeTimeCount(breakLen)
          }
        }
        changeTimeCount(timeCount - 1)
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
      <div id="inc-dec">
        <div id="session-label" className="labels">
          Session Length
          <p id="session-length">{returnMinutes(sessionLen)}</p>
          <div id="session-controls" className="controls">
            <button id="session-decrement" onClick={handleIncrease('session')}>Session Dec</button>
            <button id="session-increment" onClick={handleDecrease('session')}>Session Inc</button>
          </div>
        </div>
        <div id="break-label" className="labels">
          Break Length
          <p id="break-length">{returnMinutes(breakLen)}</p>
          <div id="break-controls" className="controls">
            <button id="break-decrement" onClick={handleIncrease('break')}>Break Dec</button>
            <button id="break-increment" onClick={handleDecrease('break')}>Break INc</button>
          </div>
        </div>
      </div>
      <div id="debug">
        <p>breakLen is: {breakLen}</p>
        <p>sessionLen is: {sessionLen}</p>
        <p>timeCount is: {timeCount}</p>
        <p>countSwitch is: {countSwitch.toString()}</p>
        <p>sessionSwitch is: {sessionSwitch.toString()}</p>
      </div>

    </div>
  );
}

export default App;
