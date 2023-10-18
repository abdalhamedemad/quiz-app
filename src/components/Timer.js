import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      //   console.log("This will run after 1 second!");
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"} {seconds}
    </div>
  );
}
export default Timer;
