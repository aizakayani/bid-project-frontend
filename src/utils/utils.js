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
  return day + " " + months[monthIndex] + "," +  year;
};
