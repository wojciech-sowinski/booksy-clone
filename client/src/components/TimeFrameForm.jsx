import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/time-frame-form.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { addTimeFrame } from "../actions/userActions";

const TimeFrameForm = ({ dayIndex, dayName, closeForm, placeId }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [addTimeFrameInfo, setAddTimeFrameInfo] = useState("");
  const dispatch = useDispatch();

  const submitHandle = (e) => {
    e.preventDefault();
    const startTime = start.split(":");
    const startH = parseInt(startTime[0]);
    const startM = parseInt(startTime[1]);

    const endTime = end.split(":");
    const endH = parseInt(endTime[0]);
    const endM = parseInt(endTime[1]);

    const startTimeinM = startH * 60 + startM;
    const endTimeinM = endH * 60 + endM;

    addTimeFrame(
      {
        dayIndex,
        start: startTimeinM,
        end: endTimeinM,
        placeId,
      },
      dispatch
    ).then((resolve) => {
      if (resolve === "time frame added") {
        setAddTimeFrameInfo("Dodano");
        setTimeout(() => {
          setAddTimeFrameInfo("");
          closeForm();
        }, 2000);
      } else if (resolve === "collides") {
        setAddTimeFrameInfo("Podane godziny kolidują z istniejącymi");
        setTimeout(() => {
          setAddTimeFrameInfo("");
        }, 3000);
      } else {
        closeForm();
      }
    });
  };

  return (
    <div className="time-frame-form-wrapper">
      <div
        onClick={() => {
          closeForm();
        }}
        className="overlay"
      ></div>
      <form onSubmit={submitHandle} className="time-frame-form">
        <div className="close-button">
          <FontAwesomeIcon
            onClick={() => {
              closeForm();
            }}
            icon={faXmark}
          />
        </div>
        <span>{dayName.toUpperCase()}</span>
        <div>
          <span>od: </span>
          <input
            type="time"
            name="start"
            id=""
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
          <span> do: </span>
          <input
            type="time"
            name="end"
            id=""
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
        </div>
        <button type="submit">Zatwierdź</button>
        {addTimeFrameInfo && <span>{addTimeFrameInfo}</span>}
      </form>
    </div>
  );
};

export default TimeFrameForm;
