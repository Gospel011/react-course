import { ACTIONS } from "./App";

function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> points out of {maxPossiblePoints} (
        {percentage.toFixed(2)}%)
      </p>

      <p className="highscore">Highscore: {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={(e) => dispatch({ type: ACTIONS.RESTART })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
