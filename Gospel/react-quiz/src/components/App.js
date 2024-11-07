import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECONDS_PER_QUESTION = 30;

//? ENUMS
export const TICK_INTERVAL = 1 * 1000; // 1 second
export const ACTIONS = {
  DATA_RECIEVED: "data-recieved",
  DATA_FAILED: "data-failed",
  START: "start",
  FINISH: "finish",
  RESTART: "restart",
  NEW_ANSWER: "new-answer",
  NEXT_QUESTION: "next-question",
  TICK: "tick",
};

const STATUS = {
  LOADING: "loading",
  ERROR: "error",
  READY: "ready",
  ACTIVE: "active",
  FINISHED: "finished",
};

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: STATUS.LOADING,

  index: 0,
  selectedAnswer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DATA_RECIEVED:
      return { ...state, questions: action.payload.data, status: STATUS.READY };

    case ACTIONS.DATA_FAILED:
      return { ...state, status: STATUS.ERROR };

    case ACTIONS.START:
      return {
        ...state,
        status: STATUS.ACTIVE,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case ACTIONS.NEW_ANSWER:
      const currentQuestion = state.questions.at(state.index);
      const isCorrect = currentQuestion.correctOption === action.payload.answer;

      return {
        ...state,
        selectedAnswer: action.payload.answer,
        points: isCorrect
          ? state.points + currentQuestion.points
          : state.points,
      };

    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        index: state.index + 1,
        selectedAnswer: null,
      };

    case ACTIONS.FINISH:
      return {
        ...state,
        status: STATUS.FINISHED,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case ACTIONS.RESTART:
      return {
        ...initialState,
        questions: state.questions,
        status: STATUS.READY,
        highscore: state.highscore,
      };

    case ACTIONS.TICK:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? STATUS.FINISHED : state.status,
      };

    default:
      throw new Error("Unknown action dispatched");
  }
}

export default function App() {
  //* S T A T E S
  const [
    {
      status,
      questions,
      index,
      selectedAnswer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  //*  D E R I V E D   S T A T E S
  const questionsLength = questions.length;
  const maxPossiblePoints = questions.reduce(
    (accumulator, current) => accumulator + current.points,
    0
  );

  //* E F F E C T S
  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: ACTIONS.DATA_RECIEVED, payload: { data } });
      } catch (error) {
        console.log({ error });
        dispatch({ type: ACTIONS.DATA_FAILED });
      }
    }

    // call fetchQuestions
    fetchQuestions();
  }, []);

  console.log({ status });

  //* J S X
  return (
    <div className="app">
      <Header />

      <Main>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <Error />}
        {status === STATUS.READY && (
          <StartScreen questionsLength={questionsLength} dispatch={dispatch} />
        )}
        {status === STATUS.ACTIVE && (
          <>
            <Progress
              index={index}
              questionsLength={questionsLength}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
            />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              {selectedAnswer != null && selectedAnswer !== undefined && (
                <Button
                  dispatch={dispatch}
                  index={index}
                  questionsLength={questionsLength}
                  selectedAnswer={selectedAnswer}
                />
              )}
            </Footer>
          </>
        )}

        {status === STATUS.FINISHED && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
