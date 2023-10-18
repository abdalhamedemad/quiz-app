function NextButton({ dispatch, index, numQuestion }) {
  return (
    <div>
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        {index !== numQuestion - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}
export default NextButton;
