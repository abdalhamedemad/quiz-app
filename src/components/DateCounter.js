import { useState, useReducer } from "react";

const initialState = { count: 0, step: 1 };

// state is the current state
// action is the value passed to dispatch
function reducer(state, action) {
  console.log(state, action);
  // return state + action;
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  // state is the current state
  // dispatch is the function that updates the state
  // reducer is the function that takes the current state , update state and returns the new state
  //  {} is the initial state
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  // date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "DECREMENT" });
  };

  const inc = function () {
    dispatch({ type: "INCREMENT" });
  };

  const defineCount = function (e) {
    dispatch({ type: "SET_COUNT", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "SET_STEP", payload: Number(e.target.value) });
  };

  const reset = function () {
    // dispatch({ type: "SET_COUNT", payload: 0 });
    // dispatch({ type: "SET_STEP", payload: 1 });
    dispatch({ type: "RESET" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
