import "./styles.css";

import React from "react";

import { formatTimeAmPm } from "../../helpers";
import { EventProperties } from "../../types/event";

interface CardProps {
  event: EventProperties;
  header: JSX.Element;
  footer: {
    btnText: string,
    handleBtnSelection: (event: EventProperties) => void;
    isDisabled: boolean;
  }
}

const Card = ({
  event,
  footer,
  header,
}: CardProps) => {
  return (
    <div className={`card ${footer.isDisabled ? "event-disabled-background" : ""}`}>
      <div className="left-container">
        <div>{event.event_category.charAt(0).toUpperCase()}</div>
      </div>
      <div className="separator"></div>
      <div className="right-container">
        {header}
        <div className="event-name" aria-label={event.event_name}>{event.event_name}</div>
        <div>({event.event_category})</div>
        <div>{new Date(event.start_time).toDateString()}</div>
        <div>
          {formatTimeAmPm(event.start_time)} - {formatTimeAmPm(event.end_time)}
        </div>
        <button
          className={`selection-button ${footer.isDisabled ? "btn-disabled" : ""}`}
          onClick={() => footer.handleBtnSelection(event)}
          disabled={footer.isDisabled}
          aria-disabled={footer.isDisabled}
          data-testid={`btn-selection-${event.id}`}
        >
          {footer.btnText}
        </button>
      </div>
    </div>
  );
};

export default Card;
