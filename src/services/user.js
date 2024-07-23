export const loginUserAPI = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const forgetPasswordAPI = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/forget-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const resetPasswordAPI = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const verifyAccountAPI = (userId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/users/verify/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const getUserDetailsAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/details", {
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
        console.log(error);
      });
  });
};

export const updateUserAPI = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/update", {
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
        console.log(error);
      });
  });
};

export const updateUserNotificationsStatus = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users//update/notifications/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const updateUserAvatarAPI = (formData) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/update/avatar", {
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
        console.log(error);
      });
  });
};

export const updateUserCoverAPI = (formData) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/update/cover", {
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
        console.log(error);
      });
  });
};

export const updateUserResumeAPI = (formData) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/update/resume", {
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
        console.log(error);
      });
  });
};

export const removeUserCoverAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/remove/cover", {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const removeUserResumeAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/remove/resume", {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const getFreelancersAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/freelancers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const getEmployersAPI = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/users/employers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};
