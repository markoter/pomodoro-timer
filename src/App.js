import { useState } from "react";

function App() {
  //state
  const [breakLen, changeBreakLen] = useState(5)
  const [sessionLen, changeSessionLen] = useState(25)

  const sessionInc = () => {
    changeSessionLen(sessionLen + 1)
  }
  const sessionDec = () => {
    changeSessionLen(sessionLen - 1)
  }
  const breakInc = () => {
    changeBreakLen(breakLen + 1)
  }
  const breakDec = () => {
    changeBreakLen(breakLen - 1)
  }
  const reset = () => {
    changeBreakLen(5)
    changeSessionLen(25)
  }
  return (
    <div id="app">
      This is app
      <div id="timer-label">
        Session
        <time id="time-left">{sessionLen}:00</time>
        <div id="controls">
          <button id="start_stop">start/stop</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
      </div>
      <div id="inc-dec">
        <div id="session-label" className="labels">
          Session Length
          <p id="session-length">{sessionLen}</p>
          <div id="session-controls" className="controls">
            <button id="session-decrement" onClick={sessionDec}>Session Dec</button>
            <button id="session-increment" onClick={sessionInc}>Session Inc</button>
          </div>
        </div>
        <div id="break-label" className="labels">
          Break Length
          <p id="break-length">{breakLen}</p>
          <div id="break-controls" className="controls">
            <button id="break-decrement" onClick={breakDec}>Break Dec</button>
            <button id="break-increment" onClick={breakInc}>Break INc</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
