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
    fetch(`http://localhost:3000/bids/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
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

export const updateBidAPI = (payload, id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/bids/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
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

export const deleteBidAPI = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/bids/delete/${id}`, {
      method: "DELETE",
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
