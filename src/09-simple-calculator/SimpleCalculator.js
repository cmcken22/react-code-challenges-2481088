// import { useReducer } from "react"

import { useCallback, useState } from "react";

const initialState = {
  num1: 0,
  num2: 0,
  result: 'no result yet'
}

const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);

  const dispatch = useCallback((action) => {
    const nextState = reducer(state, action);
    setState(nextState);
  }, [state]);

  return [state, dispatch];
}

function reducer (state, action) {
  if (action?.type === "SET_NUM_ONE") return { ...state, num1: action?.number };
  if (action?.type === "SET_NUM_TWO") return { ...state, num2: action?.number };
  if (action?.type === "ADD") return { ...state, result: state.num1 + state.num2 };
  if (action?.type === "SUB") return { ...state, result: state.num1 - state.num2 };
  if (action?.type === "CLEAR") return initialState;
}

export default function SimpleCalculator () {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('state:', state);

  return (
    <div>
      <div>
        <h2>Number 1</h2>
        {numbers.map(number => (
          <button
            key={number}
            style={{
              border: number === state?.num1 ? '1px solid black' : 'none'
            }}
            onClick={() => dispatch({ type: 'SET_NUM_ONE', number })}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        <h2>Number 2</h2>
        {numbers.map(number => (
          <button
            key={number}
            style={{
              border: number === state?.num2 ? '1px solid black' : 'none'
            }}
            onClick={() => dispatch({ type: 'SET_NUM_TWO', number })}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        <h2>Actions</h2>
        <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
        <button onClick={() => dispatch({ type: 'SUB' })}>-</button>
        <button onClick={() => dispatch({ type: 'CLEAR' })}>c</button>
      </div>
      <div><h2>Result: {state?.result}</h2></div>
    </div>
  )
}
