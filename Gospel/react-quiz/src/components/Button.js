import { ACTIONS } from "./App";

function Button({ dispatch, index, questionsLength, selectedAnswer }) {
  const atLastQuestion = index === questionsLength - 1;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: atLastQuestion ? ACTIONS.FINISH : ACTIONS.NEXT_QUESTION,
        })
      }
    >
      {atLastQuestion ? "Finish" : "Next"}
    </button>
  );
}

export default Button;
