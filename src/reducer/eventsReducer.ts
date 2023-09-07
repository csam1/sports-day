import { createContext } from 'react';

import { EventActionTypes } from '../types/Action';
import { EventProperties } from '../types/event';
import { SELECTED_EVENTS_LIMIT, USER_NAME } from '../constants';

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
      const storage = localStorage.getItem("selectedEvents");
      let eventList=action.eventList;
      let selectedEvents=[] ;
      if(storage){
        selectedEvents = JSON.parse(storage);
        let ids = selectedEvents[USER_NAME].events.map((event:EventProperties)=>event.id);
        eventList = action.eventList?.filter((event)=>!ids.includes(event.id))
      }
      return {
        eventList: eventList || [],
        selectedEventList: selectedEvents[USER_NAME].events,
      };
    }
    case EventActionTypes.DESELECT_EVENT: {
      const selectedEventList = state.selectedEventList.filter((event)=>event.id !== action?.event?.id);
      const setEvents = {[USER_NAME]: {events: selectedEventList}}
      localStorage.setItem('selectedEvents',JSON.stringify(setEvents));
      return {
        selectedEventList: selectedEventList,
        eventList: state.eventList.concat(action?.event||[])
      };
    }
    case EventActionTypes.SELECT_EVENT: {
      if (state.selectedEventList.length < SELECTED_EVENTS_LIMIT) {
        const selectedEventList = state.selectedEventList.concat(action?.event || []);
        let setEvents = {[USER_NAME]: {events: selectedEventList}};
        localStorage.setItem('selectedEvents',JSON.stringify(setEvents));
        return {
          selectedEventList,
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
