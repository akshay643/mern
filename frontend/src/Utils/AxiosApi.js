import axios from "axios";
export const headersCors = {
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
};
export const BaseURL = "https://930f-2401-4900-1f2e-62cc-8172-2ea6-c9ff-3b7f.in.ngrok.io/";

export const headers = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  if (!localStorage.getItem("loggedin")) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    };
  } else {
    return {
      Authorization: "Bearer " + LocalStorageData.access_token,
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",  
    };
  }
};

const instance = axios.create({
  baseURL: "https://930f-2401-4900-1f2e-62cc-8172-2ea6-c9ff-3b7f.in.ngrok.io/",

  headers: headers(
    "Access-Control-Allow-Origin: *"
    // "Content-Type",
    // "Access-Control-Allow-Methods: GET"
  ),
  headers: headers("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"),
  headers: headers("Access-Control-Allow-Headers", "Content-Type"),
  mode: "no-cors", // 'cors' by default
  params: {}, // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// instance.interceptors.response.use(undefined, (err) => {
//   if (err.response !== undefined) {
//     if (err.response.status === 401) {
//       localStorage.clear();
//       window.location.reload();
//     }
//   }
// });

export default instance;
