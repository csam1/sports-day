import { createContext } from 'react';

import { EventActionTypes } from '../types/Action';
import { EventProperties } from '../types/event';

type StateProps = {
  eventList: EventProperties[];
  selectedEventCount: number;
};

type ActionTypes = {
  type: EventActionTypes,
  eventList?: EventProperties[],
  event?: EventProperties;
}

export type GlobalContent = {
  state: StateProps,
  dispatchEvent:(c: ActionTypes) => void
}

export const GlobalContext = createContext<GlobalContent>({
  state: {
    eventList: [],
    selectedEventCount: 0
  },
  dispatchEvent: (c) => {}
});

export const eventReducer = (state: StateProps, action: ActionTypes): StateProps => {
  switch (action.type) {
    case EventActionTypes.UPDATE_EVENT_LIST: {
      return {
        eventList: action?.eventList || [],
        selectedEventCount: 0
      };
    }
    case EventActionTypes.DESELECT_EVENT: {
      const index = state.eventList.findIndex(
        (selectedEvent) => selectedEvent.id === action?.event?.id || 0
      );
      state.eventList[index].isEventSelected = false;
      return {
        selectedEventCount: state.selectedEventCount - 1,
        eventList: state.eventList
      };
    }
    case EventActionTypes.SELECT_EVENT: {
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
