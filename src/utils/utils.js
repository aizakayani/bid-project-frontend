export const isTokenValid = (result) => {
  if (result.message === "Invalid Token" && result.errorCode === 5003) {
    return false;
  } else {
    return true;
  }
};

export const unixToDate = (timestamp) => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = new Date(timestamp);
  var day = ("0" + date.getDate()).slice(-2);
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return day + " " + months[monthIndex] + ", " + year;
};

export const isDateGreaterThanCurrent = (givenDate) => {
  // Get the current date
  const currentDate = new Date();

  // Create a Date object for the given date
  const givenDateObj = new Date(givenDate);

  // Compare the dates
  return currentDate > givenDateObj;
};

export const addOneMonthToUnixDate = (unixTimestamp) => {
  // Convert the Unix timestamp to a JavaScript Date object
  let date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Add one month to the date
  date.setMonth(date.getMonth() + 1);

  // Convert the updated Date object back to a Unix timestamp
  let newUnixTimestamp = Math.floor(date.getTime() / 1000); // Divide by 1000 to convert milliseconds to seconds

  return newUnixTimestamp;
};

export const timeDifferenceFromNow = (unixTimestamp) => {
  // Specific date in Unix timestamp (example: July 6, 2024 00:00:00 UTC)
  // let specificUnixTimestamp = 1720262400000; // Unix timestamp in milliseconds

  // Convert Unix timestamp to Date object
  // Convert Unix timestamp to Date object
  let specificDate = new Date(unixTimestamp);

  // Current date and time
  let currentDate = new Date();

  // Difference in milliseconds
  let differenceInMs = currentDate - specificDate;

  // Calculate the difference in terms of days, hours, or minutes
  let differenceInSeconds = Math.floor(differenceInMs / 1000);
  let differenceInMinutes = Math.floor(differenceInSeconds / 60);
  let differenceInHours = Math.floor(differenceInMinutes / 60);
  let differenceInDays = Math.floor(differenceInHours / 24);

  // Determine the most appropriate unit of time to use
  let timeAgo;
  if (differenceInDays > 0) {
    timeAgo = `${differenceInDays} days ago`;
  } else if (differenceInHours > 0) {
    timeAgo = `${differenceInHours} hours ago`;
  } else if (differenceInMinutes > 0) {
    timeAgo = `${differenceInMinutes} minutes ago`;
  } else {
    timeAgo = `${differenceInSeconds} seconds ago`;
  }

  return timeAgo;
};
