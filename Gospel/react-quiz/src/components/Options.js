import { ACTIONS } from "./App";

function Options({ question, dispatch, selectedAnswer }) {
  const hasAnswered = selectedAnswer !== null && selectedAnswer !== undefined;
  // console.log({ selectedAnswer });

  // console.log({ hasAnswered });
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          onClick={() =>
            dispatch({
              type: ACTIONS.NEW_ANSWER,
              payload: { answer: index },
            })
          }
          disabled={hasAnswered}
          className={`btn btn-option ${
            selectedAnswer === index ? "answer" : ""
          } ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
