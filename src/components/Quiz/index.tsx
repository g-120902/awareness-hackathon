'use client'
import React, { useEffect, useReducer } from "react";

import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import "@/styles/quiz.css";
import { Locale } from "@/types/locale";
import { useLocale } from "next-intl";


const SECS_PER_QUESTION = 30;

// Define types for the question and the state
interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

type Action =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

// Initial state for the quiz
const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

// Reducer function with action types
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload, // Payload now contains the array of questions
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      if (!question) {
        return state; // If the question is not available, return the current state
      }

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      return state;
  }
}

// Type for the props of child components
interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

interface NextButtonProps {
  dispatch: React.Dispatch<Action>;
  answer: number | null;
  numQuestions: number;
  index: number;
}

interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}

interface TimerProps {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number | null;
}

// Main component of the quiz
const Quiz: React.FC = () => {
  const locale = useLocale() as Locale; 

  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // Determine the URL based on the locale
  const getLocalizedUrl = (locale: Locale) => {
    switch (locale) {
      case 'en':
        return 'https://api.jsonbin.io/v3/b/67517567acd3cb34a8b4758c/latest'; // English questions
      case 'fr':
        return 'https://api.jsonbin.io/v3/b/67517594acd3cb34a8b475a4/latest'; // French questions
      // Add more cases as needed
      default:
        return 'https://api.jsonbin.io/v3/b/67517567acd3cb34a8b4758c/latest';
    }
  };

  useEffect(() => {
    const url = getLocalizedUrl(locale);
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data.record.questions, // Accessing questions from `record`
        })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, [locale]);  // Re-fetch when locale changes

  return (
    <div className="wrapper">
      <div className="app">
        <div className="headerWrapper">
          <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
              <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
            )}
            {status === "active" && (
              <>
                <Progress
                  index={index}
                  numQuestions={numQuestions}
                  points={points}
                  maxPossiblePoints={questions.length}
                  answer={answer}
                />
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                />
                <Footer>
                  <Timer
                    dispatch={dispatch}
                    secondsRemaining={secondsRemaining}
                  />
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    numQuestions={numQuestions}
                    index={index}
                  />
                </Footer>
              </>
            )}
            {status === "finished" && (
              <FinishScreen
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                dispatch={dispatch}
              />
            )}
          </Main>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
