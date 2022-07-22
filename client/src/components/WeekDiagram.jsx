import { daysOfWeekWorkTime } from "../data";
import "../styles/week-diagram.scss";

const WeekDiagram = () => {
  const daysToRender = (daysToRender) => {
    const hoursRender = (workHours) => {
      const hours = [];

      const formatTimeComponent = (number) => {
        return number.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
      };

      workHours.map((frame, index) => {
        const startPosition =
          (100 / 1440) * (frame.start.h * 60 + frame.start.m);
        const endPosition =
          100 - (100 / 1440) * (frame.end.h * 60 + frame.end.m);
        hours.push(
          <div
            className="time-frame"
            style={{ left: `${startPosition}%`, right: `${endPosition}%` }}
          >
            <span>
              {formatTimeComponent(frame.start.h) +
                ":" +
                formatTimeComponent(frame.start.m)}
            </span>
            <span>
              {formatTimeComponent(frame.end.h) +
                ":" +
                formatTimeComponent(frame.end.m)}
            </span>
          </div>
        );
      });

      for (let i = 0; i < 24; i++) {
        hours.push(
          <div className="hour">
            <span>{i}</span>
          </div>
        );
      }

      return hours;
    };

    const days = [...daysToRender];

    return days.map((day) => {
      return (
        <div className={`day ${day.name}`}>
          <div className="day-label">
            <span>{day.name}</span>
          </div>
          <div className="day-hours">{hoursRender(day.workHours)}</div>
          <button className="time-frame-add-button">
            <span>+</span>
          </button>
        </div>
      );
    });
  };

  return <div className="week-diagram">{daysToRender(daysOfWeekWorkTime)}</div>;
};

export default WeekDiagram;
