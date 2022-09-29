import { useEffect, useState } from "react";

function App() {
  //state
  const [breakLen, changeBreakLen] = useState(300)
  const [sessionLen, changeSessionLen] = useState(1500)
  const [timeCount, changeTimeCount] = useState(1500)
  const [countSwitch, countSwitchOnOff] = useState(false)
  const [sessionSwitch, changeSessionOnOff] = useState(true)

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
            <button id="session-decrement" onClick={sessionDec}>Session Dec</button>
            <button id="session-increment" onClick={sessionInc}>Session Inc</button>
          </div>
        </div>
        <div id="break-label" className="labels">
          Break Length
          <p id="break-length">{returnMinutes(breakLen)}</p>
          <div id="break-controls" className="controls">
            <button id="break-decrement" onClick={breakDec}>Break Dec</button>
            <button id="break-increment" onClick={breakInc}>Break INc</button>
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
