import { useEffect, useReducer } from "react";
import Controllers from "./controllersContainer";
import ClockComp from "./clockComp";
import DebugDisplay from "./debugDisplay";
import audio from "./timer-beep.wav"


//reducer part
const initalState = {
  countingOn: false,
  sessionOn: true,
  session: 1500,
  break: 300,
  timer: 1500
}
const reducer = (state, action) => {
  let tempState = { ...state }
  const minute = 60
  const maxCount = 3600
  const minCount = 0
  const isSession = state.sessionOn && (action.property === 'session')
  const isBreak = !state.sessionOn && (action.property === 'break')
  switch (action.type) {
    case 'increment':
      tempState[action.property] = state[action.property] + minute

      //change timer only if correct session/break is on
      if (isSession  || isBreak) {
        tempState.timer = state.timer + minute
      }

      return tempState[action.property] > maxCount ? state : tempState
    case 'decrement':
      tempState[action.property] = state[action.property] - minute
      
      //change timer only if correct session/break is on
      if (isSession  || isBreak) {
        tempState.timer = state.timer - minute
      }

      return tempState[action.property] <= minCount ? state : tempState
    case 'countingDown':
      tempState.timer = state.timer - 1
      return tempState
    case 'switch-counting':
      tempState.countingOn = !state.countingOn
      return tempState
    case 'switch-session':
      tempState.sessionOn = !state.sessionOn
      tempState.timer = tempState.sessionOn ? state.session : state.break
      return tempState
    case 'reset':
      return initalState
    default:
      return state
  }

}

function App() {
  //usereducer part
  const [state, dispatch] = useReducer(reducer, initalState)
  const handlePlusMinus = (actionType, actionProperty) => {

    dispatch({ type: actionType, property: actionProperty })
  }

  //audio
  const playAudio = () => {
    new Audio(audio).play()
  }

  //buttons onClicks
  const countDown = () => {
    dispatch({ type: 'switch-counting' })
  }
  const reset = () => {
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

      if (state.countingOn) {
        dispatch({ type: 'countingDown' })
        if (state.timer <= 0) {
          playAudio()
          dispatch({ type: "switch-session" })
          // reset()
        }
      }
    }, 100)
    return () => clearInterval(counter)
  }, [state])

  return (
    <div id="app">
      This is app
      <ClockComp
        time={showTime(state.timer)}
        sessionOn={state.sessionOn}
        countDown={countDown}
        reset={reset}
      />
      <Controllers
        returnMinutes={returnMinutes}
        state={state}
        handlePlusMinus={handlePlusMinus}
      />
      <DebugDisplay state={state} />
      <button onClick={playAudio}>Play Debug</button>
    </div>
  );
}

export default App;
