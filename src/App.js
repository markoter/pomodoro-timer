import { useState } from "react";

function App() {
  //state
  const [breakLen, changeBreakLen] = useState(5)
  const [sessionLen, changeSessionLen] = useState(25)

  return (
    <div id="pomodoro-timer">
      <p>This is app</p>
      <div id="break-label">
        Break Length
        <p id="break-length">{breakLen}</p>
        <button id="break-decrement">Break Dec</button>
        <button id="break-increment">Break INc</button>
      </div>
      <div id="session-label">
        Session Length
        <p id="session-length">{sessionLen}</p>
        <button id="session-decrement">Session Dec</button>
        <button id="session-increment">Session Inc</button>
      </div>
      <div id="timer-label">
        Session
        <time id="time-left">25:00</time>
        <div id="controls">
          <button id="start_stop">start/stop</button>
          <button id="reset">reset</button>
        </div>
        </div>

    </div>
  );
}

export default App;
