function StartStream({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>welcome to react</h2>
      <h3>{numOfQuestions} questions</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let is start
      </button>
    </div>
  );
}

export default StartStream;
