import api from "./api";

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (profile, navigate) => {
  if (profile) {
    const { token } = profile;
    api.defaults.headers.common["jwt"] = token;
      localStorage.setItem("profile", JSON.stringify(profile));
      navigate("/latest");
  } else {
    delete api.defaults.headers.common["jwt"];
    localStorage.removeItem("profile");
  }
};

export default setAuthToken;
