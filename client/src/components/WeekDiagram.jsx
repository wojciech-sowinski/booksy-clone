import "../styles/week-diagram.scss";
import "../styles/buttons.scss";
import TimeFrameForm from "./TimeFrameForm";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthTimeFrames, deleteTimeFrame } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const WeekDiagram = ({ activePlace }) => {
  const [timeFrameData, setTimeFrameData] = useState({
    show: false,
    dayIndex: "",
    dayName: "",
    activePlace: "",
  });
  const { show, dayIndex, dayName } = timeFrameData;
  const { timeFrames, loading } = useSelector(
    (state) => state.timeFramesReducer
  );
  const dispatch = useDispatch();

  const daysOfWeek = [
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
    "niedziela",
  ];

  const addTimeFrame = (show = false, dayIndex = "", dayName = "") => {
    setTimeFrameData({ show, dayIndex, dayName, activePlace });
  };

  const hoursRender = (index) => {
    const hours = [];

    const formatTimeComponent = (number) => {
      return number.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    };

    const workHours = timeFrames.filter(
      (timeFrame) =>
        timeFrame.placeId === activePlace && timeFrame.dayIndex === index
    );

    workHours.forEach((frame, index) => {
      const startPosition = (100 / 1440) * frame.start;
      const endPosition = 100 - (100 / 1440) * frame.end;
      hours.push(
        <div
          key={frame._id}
          className="time-frame"
          onClick={() => {
            dispatch(deleteTimeFrame(frame._id));
          }}
          style={{ left: `${startPosition}%`, right: `${endPosition}%` }}
        >
          <span className="time-frame-span-info">
            {formatTimeComponent(parseInt(frame.start / 60)) +
              ":" +
              formatTimeComponent(
                parseInt(frame.start - parseInt(frame.start / 60) * 60)
              )}
          </span>
          <span className="time-frame-span-info">
            {formatTimeComponent(parseInt(frame.end / 60)) +
              ":" +
              formatTimeComponent(
                parseInt(frame.end - parseInt(frame.end / 60) * 60)
              )}
          </span>
        </div>
      );
    });

    for (let i = 0; i < 24; i++) {
      hours.push(
        <div key={activePlace + "hour" + i + index} className="hour">
          <span>{i}</span>
        </div>
      );
    }

    return hours;
  };
  const daysToRender = (daysToRender) => {
    const days = [...daysToRender];

    return days.map((day, index) => {
      return (
        <div key={activePlace + index} className={`day`}>
          <div className="day-label">
            <span>{day}</span>
          </div>
          <div className="day-hours">{hoursRender(index)}</div>
          <button
            className="time-frame-add-button"
            onClick={() => {
              addTimeFrame(true, index, daysOfWeek[index]);
            }}
          >
            <span>+</span>
          </button>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(fecthTimeFrames());

  }, [activePlace]);

  return (
    <>
      <div className="week-diagram">
        { }
        <span>
          <FontAwesomeIcon icon={faExclamationTriangle} /> Kliknij aby usunąć
          wybrane ramy czasowe.
        </span>
        {daysToRender(daysOfWeek)}
        {show && (
          <TimeFrameForm
            dayIndex={dayIndex}
            dayName={dayName}
            closeForm={addTimeFrame}
            placeId={activePlace}
          />
        )}
      </div>
    </>
  );
};

export default WeekDiagram;
