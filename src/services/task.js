export const getTasksByUser = () => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3000/tasks/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('token')
        }
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
  export const addTaskAPI = (payload) => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3000/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
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
  export const updateTaskAPI = (payload, id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/tasks/update/${id}`, {
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
  export const deleteTaskAPI = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/tasks/delete/${id}`, {
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