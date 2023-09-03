import { createContext } from 'react';

import { eventActionTypes } from '../types/Action';
import { EventProperties } from '../types/event';

type stateProps = {
  eventList: EventProperties[];
  selectedEventCount: number;
};

type actionTypes = {
  type: eventActionTypes,
  eventList?: EventProperties[],
  event?: EventProperties;
}

export type GlobalContent = {
  state: stateProps,
  dispatchEvent:(c: actionTypes) => void
}

export const GlobalContext = createContext<GlobalContent>({
  state: {
    eventList: [],
    selectedEventCount: 0
  },
  dispatchEvent: (c) => {}
});

export const eventReducer = (state: stateProps, action: actionTypes): stateProps => {
  switch (action.type) {
    case eventActionTypes.UPDATE_EVENT_LIST: {
      return {
        eventList: action?.eventList || [],
        selectedEventCount: 0
      };
    }
    case eventActionTypes.DESELECT_EVENT: {
      const index = state.eventList.findIndex(
        (selectedEvent) => selectedEvent.id === action?.event?.id || 0
      );
      state.eventList[index].isEventSelected = false;
      return {
        selectedEventCount: state.selectedEventCount - 1,
        eventList: state.eventList
      };
    }
    case eventActionTypes.SELECT_EVENT: {
      if (state.selectedEventCount < 3) {
        const index = state.eventList.findIndex(
          (selectedEvent) => selectedEvent.id === action?.event?.id || 0
        );
        state.eventList[index].isEventSelected = true;
        return {
          selectedEventCount: state.selectedEventCount + 1,
          eventList: state.eventList
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};
