import './styles.css';

import React from 'react';

import { formatTimeAmPm } from '../../helpers';
import { EventProperties } from '../../types/event';

interface CardProps {
  event: EventProperties;
  isEventSelected: boolean;
  handleEventSelection: (event: EventProperties) => void;
  isDisabled?: boolean;
}

const Card = ({
  event,
  isEventSelected,
  handleEventSelection,
  isDisabled = false
}: CardProps) => {
  
  return (
    <div className={`card ${isDisabled ? "event-disabled-background" : ""}`}>
      <div className="left-container">
        <div>{event.event_category.charAt(0).toUpperCase()}</div>
      </div>
      <div className="separator"></div>
      <div className="right-container">
        <div>{event.event_name}</div>
        <div>({event.event_category})</div>
        <div>{new Date(event.start_time).toDateString()}</div>
        <div>
          {formatTimeAmPm(event.start_time)} - {formatTimeAmPm(event.end_time)}
        </div>
        <button
          className={`selection-button ${isDisabled ? "btn-disabled" : ""}`}
          onClick={() => handleEventSelection(event)}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          data-testid={`btn-selection-${event.id}`}
        >
          {isEventSelected ? "Deselect" : "Select"}
        </button>
      </div>
    </div>
  );
};

export default Card;
