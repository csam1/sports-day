import React from 'react';

import { render, screen } from '@testing-library/react';

import Card from '../';

const eventMock = {
  id: 1,
  event_name: "Butterfly 100M",
  event_category: "Swimming",
  start_time: "2022-12-17 13:00:00",
  end_time: "2022-12-17 14:00:00",
  isEventSelected: false
};

describe("Card Component", () => {
  test("Should render card component with name,category,timing, select button", () => {
    render(
      <Card
        event={eventMock}
        footer={{
          btnText: 'Select',
          isDisabled: false,
          handleBtnSelection: () => null
        }}
        header={
          <></>
        }
      />
    );
    expect(screen.findByText(eventMock.event_name)).toBeTruthy();
    expect(screen.findByText(eventMock.event_category)).toBeTruthy();
    expect(screen.findByText(eventMock.start_time)).toBeTruthy();
    expect(screen.findByText(eventMock.end_time)).toBeTruthy();
    expect(
      screen.getByTestId(`btn-selection-${eventMock.id}`)
    ).toHaveProperty("disabled", false);
  });
});
