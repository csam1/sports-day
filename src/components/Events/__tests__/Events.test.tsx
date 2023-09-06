import axios from 'axios';
import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Events from '../';
import { GlobalContext } from '../../../reducer/eventsReducer';
import { EventProperties } from '../../../types/event';
import { eventsMocks, eventsMocksOverlapping, selectedEventsMocks } from '../__mocks__/eventMock';

jest.mock("axios");

const renderComponent = (props: {
  eventList: EventProperties[];
  selectedEventCount: number;
}) => {
  const { eventList, selectedEventCount } = props;
  render(
    <GlobalContext.Provider
      value={{
        state: {
          eventList,
          selectedEventCount,
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
    renderComponent({ eventList: eventsMocks, selectedEventCount: 1 });
    expect(await screen.findByText("List of all Sports events")).toBeTruthy();
    expect(await screen.findByText("Selected Events")).toBeTruthy();
    expect(await screen.findByText("All Events")).toBeTruthy();
  });

  test("Should be able to select an event from All Events section", async () => {
    renderComponent({ eventList: eventsMocks, selectedEventCount: 1 });
    expect(await screen.findByText(eventsMocks[0].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[0].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", false);
    fireEvent.click(selectionBtn);
  });
  test("Should be able to deselect an event from Selected Events section", async () => {
    renderComponent({ eventList: eventsMocks, selectedEventCount: 1 });
    expect(await screen.findByText(eventsMocks[2].event_name)).toBeTruthy();
    expect(
      await screen.findByTestId(`btn-selection-${eventsMocks[2].id}`)
    ).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[2].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", false);
  });
  test("Should NOT be able to select event which overlaps with other event", async () => {
    renderComponent({
      eventList: eventsMocksOverlapping,
      selectedEventCount: 2,
    });
    expect(await screen.findByText(eventsMocks[1].event_name)).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${eventsMocks[1].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", true);
  });
  test("Should NOT allow to select more than 3 events", async () => {
    renderComponent({ eventList: selectedEventsMocks, selectedEventCount: 3 });
    expect(
      await screen.findByText(selectedEventsMocks[1].event_name)
    ).toBeTruthy();
    expect(
      await screen.findByTestId(`btn-selection-${selectedEventsMocks[1].id}`)
    ).toBeTruthy();
    const selectionBtn = screen.getByTestId(
      `btn-selection-${selectedEventsMocks[1].id}`
    );
    expect(selectionBtn).toHaveProperty("disabled", true);
    expect(
      screen.getByText(
        "will not able to add more than 3 events, Please Deselect any to continue events selection"
      )
    ).toBeTruthy();
  });
});
