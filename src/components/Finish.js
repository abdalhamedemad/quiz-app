function FinshScreen({ points, maxPossiblePoints, dispatch }) {
  const precentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (precentage === 100) {
    emoji = "🥳";
  } else if (precentage >= 80) {
    emoji = "😀";
  } else if (precentage >= 60) {
    emoji = "😐";
  } else if (precentage >= 40) {
    emoji = "😕";
  } else if (precentage >= 20) {
    emoji = "😬";
  } else {
    emoji = "😭";
  }

  return (
    <p className="result">
      <p>
        <span>{emoji}</span> You scored <strong> {points} </strong> out of{" "}
        {maxPossiblePoints} points! {Math.ceil(precentage)}%
      </p>
      <p className="highscore">Highscore x points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        restart
      </button>
    </p>
  );
}
export default FinshScreen;
