import { createContext } from 'react';

import { EventActionTypes } from '../types/Action';
import { EventProperties } from '../types/event';
import { SELECTED_EVENTS_LIMIT } from '../constants';

type StateProps = {
  eventList: EventProperties[];
  selectedEventList: EventProperties[];
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
    selectedEventList:[],
  },
  dispatchEvent: (c) => {}
});

export const eventReducer = (state: StateProps, action: ActionTypes): StateProps => {
  switch (action.type) {
    case EventActionTypes.UPDATE_EVENT_LIST: {
      return {
        eventList: action?.eventList || [],
        selectedEventList: [],
      };
    }
    case EventActionTypes.DESELECT_EVENT: {
      return {
        selectedEventList: state.selectedEventList.filter((event)=>event.id !== action?.event?.id),
        eventList: state.eventList.concat(action?.event||[])
      };
    }
    case EventActionTypes.SELECT_EVENT: {
      if (state.selectedEventList.length < SELECTED_EVENTS_LIMIT) {
        return {
          selectedEventList: state.selectedEventList.concat(action?.event || []),
          eventList: state.eventList.filter((event)=>event.id !== action?.event?.id)
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};
