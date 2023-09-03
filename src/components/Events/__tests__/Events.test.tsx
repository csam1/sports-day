import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Events from "../";
import { GlobalContext } from "../../../reducer/eventsReducer";
import {
  eventsMocks,
  eventsMocksOverlapping,
  selectedEventsMocks,
} from "../__mocks__/eventMock";
import AllEvents from "../AllEvents";
import SelectedEvents from "../SelectedEvents";

describe("render sports day events", () => {
  test("Should show All Events, selected Events section", () => {
    render(
      <GlobalContext.Provider
        value={{
          state: {
            eventList: eventsMocks,
            selectedEventCount: 1,
          },
          dispatchEvent: () => {},
        }}
      >
        <Events />
      </GlobalContext.Provider>
    );
    expect(screen.findByText("List of all Sports events")).toBeTruthy();
    expect(screen.findByText("Selected Events")).toBeTruthy();
    expect(screen.findByText("All Events")).toBeTruthy();
  });

  test("Should be able to select an event from All Events section", async () => {
    render(
      <GlobalContext.Provider
        value={{
          state: {
            eventList: eventsMocks,
            selectedEventCount: 1,
          },
          dispatchEvent: () => {},
        }}
      >
        <AllEvents />
      </GlobalContext.Provider>
    );
    expect(await screen.findByText("Butterfly 100M")).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[0].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", false);
    fireEvent.click(selectionBtn);
  });
  test("Should be able to deselect an event from Selected Events section", () => {
    render(
      <GlobalContext.Provider
        value={{
          state: {
            eventList: eventsMocks,
            selectedEventCount: 1,
          },
          dispatchEvent: () => {},
        }}
      >
        <SelectedEvents />
      </GlobalContext.Provider>
    );
    expect(screen.findByText(eventsMocks[2].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[2].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", false);
    fireEvent.click(selectionBtn);
  });
  test("Should NOT be able to select event which overlaps with other event", () => {
    render(
      <GlobalContext.Provider
        value={{
          state: {
            eventList: eventsMocksOverlapping,
            selectedEventCount: 2,
          },
          dispatchEvent: () => {},
        }}
      >
        <AllEvents />
      </GlobalContext.Provider>
    );
    expect(screen.findByText(eventsMocks[1].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[1].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", true);
  });
  test("Should NOT allow to select more than 3 events", () => {
    render(
      <GlobalContext.Provider
        value={{
          state: {
            eventList: selectedEventsMocks,
            selectedEventCount: 3,
          },
          dispatchEvent: () => {},
        }}
      >
        <Events />
      </GlobalContext.Provider>
    );
    expect(screen.findByText(eventsMocks[1].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[1].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", true);
    expect(screen.getByText("will not able to add more than 3 events, Please Deselect any to continue events selection")).toBeTruthy();
  });
});
