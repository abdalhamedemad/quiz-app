import "./index.css";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import { useEffect, useReducer } from "react";
import StartStream from "./components/StartStream";
import Question from "./components/Question.js";
import NextButton from "./components/NextButton.js";
import Progress from "./components/Progress";
import FinshScreen from "./components/Finish";
import Timer from "./components/Timer";
const SEC_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // 'loading' | 'error' | 'ready' |  'active' | 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECIEVED":
      return { ...state, questions: action.payload, status: "ready" };
    case "DATA_FAILED":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status:
          state.index + 1 === state.questions.length
            ? "finished"
            : state.status,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return {...state , points:0 , index:0 , answer:null , status:'ready'}
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unknown action `);
  }
}
function App() {
  // const [questions, setQuestions] = useState([]);
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);
  useEffect(() => {
    async function getData() {
      // if (status !== "loading") return;
      try {
        const response = await fetch("http://localhost:8000/questions", {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!response.ok) {
          dispatch({ type: "DATA_FAILED" });
          // throw new Error(response.status);
        }
        const questions = await response.json();
        // setQuestions((data) => (data = questions));
        dispatch({ type: "DATA_RECIEVED", payload: questions });
        console.log(questions);
      } catch (error) {
        dispatch({ type: "DATA_FAILED" });
        // throw new Error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartStream dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {answer != null && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  numQuestion={numOfQuestions}
                />
              )}
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinshScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
