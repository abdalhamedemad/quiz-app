function Progress({ index, numQuestion, points, maxPossiblePoints, answer }) {
  return (
    <div className="progress">
      <progress
        max={numQuestion}
        value={index + Number(answer != null)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}
export default Progress;
