import axios from "axios";
import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Events from "../";
import { GlobalContext } from "../../../reducer/eventsReducer";
import { EventProperties } from "../../../types/event";
import {
  eventsMocks,
  selectedEventsMocks,
} from "../__mocks__/eventMock";
import { SELECTED_EVENTS_LIMIT } from "../../../constants";

jest.mock("axios");

const renderComponent = (props: {
  eventList: EventProperties[];
  selectedEventList: EventProperties[];
}) => {
  const { eventList, selectedEventList } = props;
  return render(
    <GlobalContext.Provider
      value={{
        state: {
          eventList,
          selectedEventList,
        },
        dispatchEvent: () => {},
      }}
    >
      <Events />
    </GlobalContext.Provider>
  );
};

describe("render sports day events", () => {
  beforeEach(() => {
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: eventsMocks })
      );
  });
  test("Should show All Events, selected Events section", async () => {
    renderComponent({
      eventList: eventsMocks,
      selectedEventList: selectedEventsMocks,
    });
    expect(await screen.findByText("List of all Sports events")).toBeTruthy();
    expect(await screen.findByText("Selected Events")).toBeTruthy();
    expect(await screen.findByText("All Events")).toBeTruthy();
  });

  test("Should be able to select an event from All Events section", async () => {
    renderComponent({
      eventList: eventsMocks,
      selectedEventList: selectedEventsMocks.slice(0, selectedEventsMocks.length - 1),
    });
    expect(await screen.findByText(eventsMocks[2].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[2].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", false);
    fireEvent.click(selectionBtn);
  });
  test("Should be able to deselect an event from Selected Events section", async () => {
    renderComponent({
      eventList: eventsMocks,
      selectedEventList: selectedEventsMocks,
    });
    expect(await screen.findByText(selectedEventsMocks[1].event_name)).toBeTruthy();
    expect(
      await screen.findByTestId(`btn-selection-${selectedEventsMocks[1].id}`)
    ).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${selectedEventsMocks[1].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", false);
  });
  test("Should NOT be able to select event which overlaps with other event", async () => {
    renderComponent({
      eventList: eventsMocks,
      selectedEventList: selectedEventsMocks.slice(1),
    });
    
    expect(await screen.findByText(eventsMocks[3].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[3].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", true);
  });
  test("Should NOT allow to select more than 3 events", async () => {
    renderComponent({
      eventList: eventsMocks,
      selectedEventList: selectedEventsMocks,
    });
    expect(
      await screen.findByText(eventsMocks[1].event_name)
    ).toBeTruthy();
    expect(
      await screen.findByTestId(`btn-selection-${eventsMocks[1].id}`)
    ).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[1].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", true);
    expect(
      screen.getByText(
        `Cannot add more than ${SELECTED_EVENTS_LIMIT} events, Please Deselect any to continue events selection`
      )
    ).toBeTruthy();
  });
});