import axios from "axios";

export const getEventsList = async () => {
  try {
    // added timeout of 10s
    axios.defaults.timeout = 10000;
    const response = await axios.get(
      "https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a"
    );
    return await response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
