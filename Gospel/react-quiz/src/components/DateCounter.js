import { useReducer } from "react";

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  SET_COUNT: "set-count",
  SET_STEP: "set-step",
  RESET: "reset",
};

const initialState = { step: 1, count: 0 };

function reducer(state, action) {
  console.log({ state, action });
  console.log("here");
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + state.step };

    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - state.step };

    case ACTIONS.SET_COUNT:
      return { ...state, count: action.payload.count };

    case ACTIONS.SET_STEP:
      return { ...state, step: action.payload.step };

    case ACTIONS.RESET:
      return initialState;

    default:
      console.log("In default");
      break;
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({
      type: ACTIONS.SET_COUNT,
      payload: { count: Number(e.target.value) },
    });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: ACTIONS.RESET });
  };

  return (
    <div className="counter">
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({
              type: ACTIONS.SET_STEP,
              payload: { step: Number(e.target.value) },
            })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
