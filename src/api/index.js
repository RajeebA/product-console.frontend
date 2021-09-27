import axiosInstance from "./axiosInstance";
import { confirmAlert } from "react-confirm-alert";

// ERROR HANDLER
const handleError = (error) => {
  let err = {
    status: "",
    message:
      "Failed to receive response from the server. Please try again later or contact support."
  };

  if (error && error.response && error.response.status && error.response.data) {
    err.status = error.response.status ?? "";
    err.message = error.response.data.error ?? "";

    console.error(error.response);

    // if (error.response.status === 401) {
    //   alerter("Unauthorized", "Please sign in again to view this page.", true);
    //   return null;
    // } else {
    //   alerter("", err.message);
    // }
  } else {
    // alerter("Something went wrong", err.message);
  }

  return null;
};

const alerter = (
  title = "Message",
  message = "Hi, I am the default alerter.",
  refresh = false
) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Close",
        onClick: () => {
          if (refresh) window.location.reload();
        }
      }
    ]
  });
};

/*
----------------------------------------------------------------------------
*/

// GET method API function
const getData = async (path, params = {}) => {
  let response;

  response = await axiosInstance.get(path).catch(handleError);
  if (response && response.data && response.status && response.status === 200) {
    return response;
  } else {
    return null;
  }
};

// POST method API function
const postData = async (path, data) => {
  let response;

  response = await axiosInstance.post(path, data).catch(handleError);

  if (response && response.data && response.status && response.status === 200) {
    return response.data.data;
  } else {
    return null;
  }
};

export { getData, postData };
