import axios from "axios";

import { EventProperties } from "../types/event";

export const getEventsList = async () => {
  try {
    const response = await axios.get(
      "https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a"
    );
    const data = await response.data;
    data.forEach((val: EventProperties) => {
      val["isEventSelected"] = false;
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
