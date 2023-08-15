import { API } from "../../backend";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const authenticateUser = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("Sign Out success"))
      .catch((error) => console.log(error));
  }
};

export const isUserAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("auth_token")) {
    return JSON.parse(localStorage.getItem("auth_token"));
  } else {
    return false;
  }
};
