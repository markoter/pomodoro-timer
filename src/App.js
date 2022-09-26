import { useState } from "react";

function App() {
  //state
  const [breakLen, changeBreakLen] = useState(5)
  const [sessionLen, changeSessionLen] = useState(25)

  return (
    <div id="app">
      This is app
      <div id="timer-label">
        Session
        <time id="time-left">25:00</time>
        <div id="controls">
          <button id="start_stop">start/stop</button>
          <button id="reset">reset</button>
        </div>
      </div>
      <div id="inc-dec">

        <div id="session-label" className="labels">
          Session Length
          <p id="session-length">{sessionLen}</p>
          <div id="session-controls" className="controls">
            <button id="session-decrement">Session Dec</button>
            <button id="session-increment">Session Inc</button>
          </div>
        </div>
        <div id="break-label" className="labels">
          Break Length
          <p id="break-length">{breakLen}</p>
          <div id="break-controls" className="controls">
            <button id="break-decrement">Break Dec</button>
            <button id="break-increment">Break INc</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
