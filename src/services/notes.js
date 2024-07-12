export const getNotesAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/notes/get", {
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

export const addNoteAPI = (payload) => {
  console.log("API CAL");
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("HMMMMM:", res);
        res.json();
      })
      .then((result) => {
        console.log("HUI:", result);
        resolve(result);
      })
      .catch((error) => {
        console.log("ERROR", error);
        reject(error);
      });
  });
};

export const deleteNoteAPI = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/notes/delete/${id}`, {
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
