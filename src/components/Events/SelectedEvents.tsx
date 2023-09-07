import React, { useCallback, useContext } from "react";

import { GlobalContent, GlobalContext } from "../../reducer/eventsReducer";
import { EventActionTypes } from "../../types/Action";
import { EventProperties } from "../../types/event";
import Card from "../Card";
import { isEventRegistrationClosed } from "../../helpers";

const SelectedEvents = () => {
  const { state, dispatchEvent } = useContext<GlobalContent>(GlobalContext);

  const handleEventSelection = useCallback((event: EventProperties) => {
    dispatchEvent({
      type: EventActionTypes.DESELECT_EVENT,
      event,
    });
  }, []);
  return (
    <div className="show-all-events-container">
      <h2>Selected Events</h2>
      <p>{state.selectedEventList.length === 0 ? "No events are selected" : ""}</p>
      <div className="card-container">
        {state.selectedEventList?.map((event: EventProperties) => {
          return (
            <Card
              key={event.id}
              event={event}
              footer={{
                handleBtnSelection: handleEventSelection,
                isDisabled:  false,
                btnText: "Deselect"
              }}
              header={
                isEventRegistrationClosed(event.start_time)
                  ? <div className="error-msg">Event registration closed</div>
                  : <div className="status-open-msg">Open</div>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectedEvents;
