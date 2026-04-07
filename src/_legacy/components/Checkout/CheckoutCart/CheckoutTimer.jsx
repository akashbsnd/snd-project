import { useState, useEffect } from "react";
import { formatDate } from "../../../hooks/dateFuncs";
import { labels } from "../../../static/labels";

export default function CheckoutTimer() {
  const [timerSec, setTimerSec] = useState(0);
  const [timerMin, setTimerMin] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      if (timerMin > 0 && timerSec === 0) {
        setTimerSec(59);
        setTimerMin(timerMin - 1);
      } else if (timerMin > 0) {
        setTimerSec(timerSec - 1);
      }
    }, 1000);
  }, [timerSec]);

  return (
    <>
      {labels.checkout.apptHeldFor + " "}
      {timerMin}
      {":" + formatDate(timerSec)}
      {" " + labels.checkout.minutesTimer}
    </>
  );
}
