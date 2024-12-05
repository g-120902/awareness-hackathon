import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div>
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctOption;
        const isSelected = index === answer;

        return (
          <button
            className={`btn btn-option ${isSelected ? "answer" : ""} ${
              hasAnswered ? (isCorrect ? "correct" : "wrong") : ""
            }`}
            key={index}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
            {hasAnswered && (
              <>
                {isCorrect && <FaCheckCircle style={{ marginLeft: "8px", color: "green" }} />}
                {!isCorrect && isSelected && (
                  <FaTimesCircle style={{ marginLeft: "8px", color: "red" }} />
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
