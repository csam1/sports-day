import "./styles.css";

import React, { useCallback, useContext } from "react";

import { isEventRegistrationClosed, 
  isTimingOverlapping
 } from "../../helpers";
import { GlobalContent, GlobalContext } from "../../reducer/eventsReducer";
import { EventActionTypes } from "../../types/Action";
import { EventProperties } from "../../types/event";
import Card from "../Card";
import { SELECTED_EVENTS_LIMIT } from "../../constants";

const AllEvents = () => {
  const { state, dispatchEvent } = useContext<GlobalContent>(GlobalContext);

  const handleEventSelection = useCallback((event: EventProperties) => {
    dispatchEvent({
      type: EventActionTypes.SELECT_EVENT,
      event,
    });
  }, []);

  const handleDisableEvent = (event: EventProperties) => {
    for (let index = 0; index < state.selectedEventList.length; index++) {
      if (
        state.selectedEventList[index] &&
        isTimingOverlapping(
          event?.start_time,
          event?.end_time,
          state.selectedEventList[index].start_time,
          state.selectedEventList[index].end_time
        )
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="show-all-events-container">
      <h2>All Events</h2>
      <div className="card-container">
        {state.eventList?.map((event: EventProperties) => {
          return (
            <Card
              key={event.id}
              event={event}
              footer={{
                handleBtnSelection: handleEventSelection,
                isDisabled:  (handleDisableEvent(event) ||
                // isEventRegistrationClosed(event.start_time) ||
                state.selectedEventList.length === SELECTED_EVENTS_LIMIT),
                btnText: "Select"
              }}
              header={
                isEventRegistrationClosed(event.start_time)
                  ? <div className="error-text">Event registration closed</div>
                  : <div className="status-open-msg">Open</div>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllEvents;
