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

export const timeDifferenceFromNow = (unixTimestamp) => {
  // Parse the input date
  const date = new Date(unixTimestamp * 1000);
  const now = new Date();

  // Calculate the difference in milliseconds
  let diff = now - date;

  // Calculate the time components
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  diff -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  diff -= months * 1000 * 60 * 60 * 24 * 30;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));

  // Determine the most significant time component
  let result;
  if (years > 0) {
    result = `${years} year${years !== 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    result = `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    result = `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    result = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    result = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  return result;
};

// Example usage
const inputDate = "2020-01-01T12:00:00";
console.log(timeDifferenceFromNow(inputDate));
