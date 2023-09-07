import './styles.css';

import React, { useReducer } from 'react';

import Events from './components/Events';
import { eventReducer, GlobalContext } from './reducer/eventsReducer';

export default function App() {
  const [state, dispatchEvent] = useReducer(eventReducer, {
    eventList: [],
    selectedEventList: []
  });
  return (
    <GlobalContext.Provider value={{state, dispatchEvent}}>
      <Events />
    </GlobalContext.Provider>
  );
}
