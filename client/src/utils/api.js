import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set JWT token in headers if present in local storage
const profile = JSON.parse(localStorage.getItem("profile"));
if (profile) {
  const { token } = profile;
  api.defaults.headers.common["jwt"] = token;
}

/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // clean local storage
      localStorage.removeItem("profile");
      delete api.defaults.headers.common["jwt"];
    }
    return Promise.reject(err);
  }
);

export default api;
