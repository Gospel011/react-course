import { useEffect } from "react";
import { ACTIONS, TICK_INTERVAL } from "./App";



function Timer({ secondsRemaining, dispatch }) {
  //* D E R I V E D   S T A T E
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  //* E F F E C T S
  useEffect(function () {
    const id = setInterval(function () {
      dispatch({ type: ACTIONS.TICK });
    }, TICK_INTERVAL);

    return () => clearInterval(id);
  });

  //* J S X
  return (
    <div className="timer">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
