function Options({ question, dispatch, answer }) {
  const showCorrectAnswer = (idx) => {
    return answer != null
      ? idx === question.correctOption
        ? "correct"
        : "wrong"
      : "";
  };
  return (
    <div className="options">
      {question.options.map((curr, idx) => {
        return (
          <button
            disabled={answer != null}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: idx });
            }}
            key={idx}
            className={`btn btn-option ${
              idx === answer ? "answer" : ""
            } ${showCorrectAnswer(idx)} `}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
}
export default Options;
