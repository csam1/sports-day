/**
 *  Return formatted time  <(HH:MM) AM|PM>
 * @param time
 */
export const formatTimeAmPm = (time: string): string => {
  const hour = new Date(time).getHours();
  const minutes = new Date(time).getMinutes().toString().padEnd(2, "0");
  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
};

/**
 * Return boolean value that indicates whether 2 events time is overlapping or not
 * @param firstStartTime - first event start time
 * @param firstEndTime - first event end time
 * @param secondStartTime - second event start time
 * @param secondEndTime - second event end time
 */
export const isTimingOverlapping = (
  firstStartTime: string,
  firstEndTime: string,
  secondStartTime: string,
  secondEndTime: string
): boolean => {
  // check if both events starts and ends at same time
  if (firstStartTime === secondStartTime && firstEndTime === secondEndTime) {
    return true;
  }

  let startTime1 = new Date(firstStartTime);
  let startTime2 = new Date(secondStartTime);
  // check if both events start date is same or not
  if (startTime1.toDateString() === startTime2.toDateString()) {
    let endTime1 = new Date(firstEndTime);
    let endTime2 = new Date(secondEndTime);

    // check if start time for first event lies between timing of second event
    if (startTime1 < endTime2 && startTime1 > startTime2) {
      return true;
    }

    // check if start time for second event lies between timing of first event
    if (startTime2 < endTime1 && startTime2 > startTime1) {
      return true;
    }
  }
  return false;
};
