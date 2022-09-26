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

    </div>
  );
}

export default App;
