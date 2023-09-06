import React, { useContext, useEffect, useState } from "react";

import { getEventsList } from "../../api/events";
import { GlobalContent, GlobalContext } from "../../reducer/eventsReducer";
import { EventActionTypes } from "../../types/Action";
import AllEvents from "./AllEvents";
import SelectedEvents from "./SelectedEvents";

const Events = () => {
  const { state, dispatchEvent } = useContext<GlobalContent>(GlobalContext);
  const [apiState, setApiState] = useState({
    loading: "",
    errorMsg: "",
  });

  const updateEventsList = async () => {
    try {
      setApiState((state) => ({
        ...state,
        loading: "Loading...",
        errorMsg: "",
      }));
      const data = await getEventsList();
      setApiState((state) => ({ ...state, loading: "" }));
      dispatchEvent({
        type: EventActionTypes.UPDATE_EVENT_LIST,
        eventList: data,
      });
    } catch (e) {
      setApiState((state) => ({
        ...state,
        loading: "",
        errorMsg: "Please try again after sometime!!",
      }));
    }
  };

  useEffect(() => {
    updateEventsList();
  }, []);

  const renderEventsContent = () => {
    if (apiState.loading) {
      return <div className="align-text-center">{apiState.loading}</div>;
    } else if (apiState.errorMsg) {
      return <div className="align-text-center">{apiState.errorMsg}</div>;
    } else {
      return (
        <>
          <AllEvents />
          <SelectedEvents />
        </>
      );
    }
  };

  return (
    <>
      <h1>Sports Day</h1>
      <h2>List of all Sports events</h2>
      <p className="error-msg">
        {state.selectedEventCount === 3
          ? "will not able to add more than 3 events, Please Deselect any to continue events selection"
          : ""}
      </p>
      <div className="events-container">{renderEventsContent()}</div>
    </>
  );
};
export default Events;
