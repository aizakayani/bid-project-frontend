export const getJobsApplicationsByUser = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/job-applications/get", {
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

export const getJobsApplicationsByJobIds = (jobIds) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/job-applications/get/${jobIds.join(",")}`, {
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

export const addJobApplication = (formData) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/job-applications/add`, {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
      body: formData,
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
