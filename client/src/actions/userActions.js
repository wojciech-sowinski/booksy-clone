import axios from "axios";
import config from "../config";

const headers = {
  headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
};

export const fetchUserData = () => async (dispatch) => {
  dispatch({ type: "fetchUserData", payload: { loading: true } });
  await axios.get(config.serverUrl + "user", headers).then((resolve) => {
    if (resolve.data.success) {
      dispatch({
        type: "fetchUserData",
        payload: {
          userData: resolve.data.userData,
          loading: false,
          auth: resolve.data.auth,
        },
      });
    } else {
      dispatch({
        type: "fetchUserData",
        payload: {
          userData: {},
          loading: false,
          auth: resolve.data.auth,
        },
      });
    }
  });
};

export const registerNewUser = (registerData, dispatch) => {
  dispatch({ type: "registerNewUser", payload: { loading: true } });
  return axios
    .post(config.serverUrl + "register", { ...registerData })
    .then((resolve) => {
      if (resolve.data.success) {
        dispatch({
          type: "registerNewUser",
          payload: { loading: false },
        });
        return resolve.data.response;
      } else {
        dispatch({
          type: "registerNewUser",
          payload: { loading: false },
        });
        return resolve.data.response;
      }
    });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: "clearUserData" });
};

export const loginUser = (loginData, dispatch) => {
  dispatch({ type: "loginUser", payload: { loading: true, auth: false } });
  return axios
    .post(config.serverUrl + "login", { ...loginData })
    .then((resolve) => {
      if (resolve.data.response === "user log in") {
        localStorage.clear();
        dispatch({ type: "clearUserData" });
        localStorage.setItem(config.authTokenName, resolve.data.authToken);

        dispatch({
          type: "loginUser",
          payload: {
            loading: false,

            auth: true,
          },
        });
        return resolve.data.success;
      } else if (resolve.data.response === "bad login or password") {
        dispatch({
          type: "loginUser",
          payload: {
            loading: false,

            auth: false,
          },
        });
        return resolve.data.success;
      }
    });
};

export const addPlace = (formData) => async (dispatch) => {
  dispatch({
    type: "fetchPlaces",
    loading: true,
  });
  await axios
    .post(
      config.serverUrl + "places",
      { ...formData },
      {
        headers: {
          "x-access-token": localStorage.getItem(config.authTokenName),
        },
      }
    )
    .then((resolve) => {
      if (resolve.data.success) {
        dispatch({
          type: "fetchPlaces",
          payload: { places: resolve.data.places, loading: false },
        });
      } else {
        dispatch({
          type: "fetchPlaces",
          payload: { places: resolve.data.places, loading: false },
        });
      }
    });
};
export const fetchPlaces = () => async (dispatch) => {
  dispatch({ type: "fetchPlaces", payload: { loading: true } });

  await axios
    .get(config.serverUrl + "places", {
      headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
    })
    .then((resolve) => {
      dispatch({
        type: "fetchPlaces",
        payload: { places: resolve.data.places, loading: false },
      });
    });
};
export const updatePlace = (formData) => async (dispatch) => {
  dispatch({ type: "fetchPlaces", payload: { loading: true } });
  await axios
    .put(
      config.serverUrl + "places",
      { ...formData },
      {
        headers: {
          "x-access-token": localStorage.getItem(config.authTokenName),
        },
      }
    )
    .then((resolve) => {
      dispatch({
        type: "fetchPlaces",
        payload: { places: resolve.data.places, loading: false },
      });
    });
};
export const deletePlace = (formData) => async (dispatch) => {
  await axios
    .delete(config.serverUrl + "places", {
      headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
      data: {
        ...formData,
      },
    })
    .then((resolve) => {
      dispatch({
        type: "fetchPlaces",
        payload: { places: resolve.data.places },
      });
    });
};

export const addTimeFrame = (formData, dispatch) => {
  return axios
    .post(
      config.serverUrl + "frames",
      { ...formData },
      {
        headers: {
          "x-access-token": localStorage.getItem(config.authTokenName),
        },
      }
    )
    .then((resolve) => {
      if (resolve.data.success) {
        dispatch({ type: "fetchTimeFrames", payload: resolve.data });

        return resolve.data.result;
      } else {
        return resolve.data.result;
      }
    });
};

export const fecthTimeFrames = () => async (dispatch) => {
  dispatch({ type: "fetchTimeFrames", payload: { loading: true } });
  await axios
    .get(config.serverUrl + "frames", {
      headers: {
        "x-access-token": localStorage.getItem(config.authTokenName),
      },
    })
    .then((resolve) => {
      if (resolve.data.success) {
        dispatch({
          type: "fetchTimeFrames",
          payload: { ...resolve.data, loading: false },
        });
      } else {
      }
    });
};

export const deleteTimeFrame = (id) => async (dispatch) => {
  await axios
    .delete(config.serverUrl + "frames", {
      headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
      data: {
        frameId: id,
      },
    })
    .then((resolve) => {
      dispatch({ type: "fetchTimeFrames", payload: resolve.data });
    });
};

export const addService = (activePlace, formData, dispatch) => {
  
  return axios
    .post(
      config.serverUrl + "services",
      { ...formData },
      {
        headers: {
          "x-access-token": localStorage.getItem(config.authTokenName),
        },
      }
    )
    .then((resolve) => {
      fetchServices(dispatch)
    });
};

export const updateService = (formData, dispatch) => {
 
  return axios
    .put(
      config.serverUrl + "services",
      { ...formData },
      {
        headers: {
          "x-access-token": localStorage.getItem(config.authTokenName),
        },
      }
    )
    .then((resolve) => {
      fetchServices(dispatch)
      return resolve.data
      
    });
};

export const fetchServices  = (dispatch)=>{
dispatch({type:"fetchServices",payload:{loading:true}})

  return axios
    .get(
      config.serverUrl + "services",
            {
        headers: {
          "x-access-token": localStorage.getItem(config.authTokenName),
        },
      }
    )
    .then((resolve) => {
     
      dispatch({type:"fetchServices",payload:{loading:false,services:resolve.data.services}})
      
    });
};

export const deleteService = (id) => async (dispatch) => {
  await axios
    .delete(config.serverUrl + "services", {
      headers: { "x-access-token": localStorage.getItem(config.authTokenName) },
      data: {
        serviceId: id,
      },
    })
    .then((resolve) => {
      fetchServices(dispatch)
    });
};
