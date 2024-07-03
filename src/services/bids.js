export const getBidsByUserAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/bids/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBidsByTaskIds = (taskIds) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/bids/get/${taskIds.join(",")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addBidAPI = (payload) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/job-applications/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
