import './styles.css';

import React, { useCallback, useContext } from 'react';

import { isTimingOverlapping } from '../../helpers';
import { GlobalContent, GlobalContext } from '../../reducer/eventsReducer';
import { EventActionTypes } from '../../types/Action';
import { EventProperties } from '../../types/event';
import Card from '../Card';

const AllEvents = () => {
  const {state, dispatchEvent} = useContext<GlobalContent>(GlobalContext);

  const handleEventSelection = useCallback((event: EventProperties) => {
    dispatchEvent({
      type: EventActionTypes.SELECT_EVENT,
      event,
    });
  }, []);

  const handleDisableEvent = (event: EventProperties) => {
    for (let index = 0; index < state.eventList.length; index++) {
      if (
        state.eventList[index].isEventSelected &&
        isTimingOverlapping(
          event?.start_time,
          event?.end_time,
          state.eventList[index].start_time,
          state.eventList[index].end_time
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
          if (!event.isEventSelected) {
            return (
              <Card
                key={event.event_name}
                event={event}
                isEventSelected={event.isEventSelected}
                handleEventSelection={handleEventSelection}
                isDisabled={
                  handleDisableEvent(event) || state.selectedEventCount === 3
                }
              />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default AllEvents;
