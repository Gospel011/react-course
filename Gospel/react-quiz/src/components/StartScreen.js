import { ACTIONS } from "./App";

function StartScreen({ questionsLength, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsLength} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={(e) => dispatch({ type: ACTIONS.START })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
