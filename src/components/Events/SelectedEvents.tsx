import React, { useCallback, useContext } from 'react';

import { GlobalContent, GlobalContext } from '../../reducer/eventsReducer';
import { eventActionTypes } from '../../types/Action';
import { EventProperties } from '../../types/event';
import Card from '../Card';

const SelectedEvents = () => {
  const { state, dispatchEvent } = useContext<GlobalContent>(GlobalContext);

  const handleEventSelection = useCallback((event: EventProperties) => {
    dispatchEvent({
      type: eventActionTypes.DESELECT_EVENT,
      event,
    });
  }, []);
  return (
    <div className="show-all-events-container">
      <h2>Selected Events</h2>
      <p>{state.selectedEventCount === 0? 'No events are selected':''}</p>
      <div className="card-container">
        {state.eventList?.map((event: EventProperties) => {
          if (event.isEventSelected) {
            return (
              <Card
                key={event.id}
                event={event}
                isEventSelected={event.isEventSelected}
                handleEventSelection={handleEventSelection}
              />
            );
          }
          return null;
        })}

      </div>
    </div>
  );
};

export default SelectedEvents;
