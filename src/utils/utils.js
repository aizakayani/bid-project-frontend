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
  var date = new Date(timestamp * 1000);
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
