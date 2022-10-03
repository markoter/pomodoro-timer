import { useEffect, useState, useReducer } from "react";
import Controllers from "./controllersContainer";
import ClockComp from "./clockComp";

//reducer part
const initalState = { 
  session: 1500, 
  break: 300, 
  timer: 1500, 
  countingOn: false,
  sessionOn: true 
 }
const reducer = (state, action) => {
  let tempState = { ...state }
  const minute = 60
  const maxCount = 3600
  const minCount = 0
  switch (action.type) {
    case 'increment':
      tempState[action.property] = state[action.property] + minute
      if (state.sessionOn && (action.property === 'session')) {
        tempState.timer = state.timer + minute

      }
      else if(!state.sessionOn && (action.property === 'break')) {
        tempState.timer = state.timer + minute
      }
      return tempState[action.property] > maxCount ? state : tempState
    case 'decrement':
      tempState[action.property] = state[action.property] - minute
      tempState.timer = state.timer - minute
      return tempState[action.property] < minCount ? state : tempState
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
  }

}

function App() {
  //state
  const [timeCount, changeTimeCount] = useState(1500)

  //usereducer part
  const [state, dispatch] = useReducer(reducer, initalState)
  const handlePlusMinus = (actionType, actionProperty) => {

    dispatch({ type: actionType, property: actionProperty })
  }

  //buttons onClicks
  const countDown = () => {
    console.log("countDown clicked")
    dispatch({type: 'switch-counting'})
  }
  const reset = () => {
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

      if (state.countingOn) {
        console.log('timer should run')
        if (state.timer <= 0) {
          dispatch({type: "switch-session"})
          // if (sessionOn) {
          //   changeTimeCount(sessionLen)
          // }
          // else {
          //   changeTimeCount(breakLen)
          // }
        }
        dispatch({ type: 'countingDown'})
      }
    }, 10)
    return () => clearInterval(counter)
  }, [state])

  return ( 
    <div id="app">
      This is app
      <ClockComp
        time={showTime(state.timer)}
        countDown={countDown}
        reset={reset}
      />
      <Controllers
        returnMinutes={returnMinutes}
        state={state}
        handlePlusMinus={handlePlusMinus}
      />
      <div id="debug">
        <p>break time is: {state.break}</p>
        <p>session time is: {state.session}</p>
        <p>timeCount is: {timeCount}</p>
        <p>timer is: {state.timer}</p>
        <p>countingOn is: {state.countingOn.toString()}</p>
        <p>sessionOn is: {state.sessionOn.toString()}</p>
      </div>

    </div>
  );
}

export default App;
