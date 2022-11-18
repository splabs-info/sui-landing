import { toast } from "react-toastify";
import { AppConfig } from "../setting";
import { logout } from "../utils/auth";
import { getAccessToken } from "./auth";
export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function get(endpoint, successCallback, errorCallback) {
  myFetch("GET", endpoint, undefined, successCallback, errorCallback);
}

export function post(endpoint, body, successCallback, errorCallback) {
  myFetch("POST", endpoint, body, successCallback, errorCallback);
}

export function put(endpoint, body, successCallback, errorCallback) {
  myFetch("PUT", endpoint, body, successCallback, errorCallback);
}

export function _delete(endpoint, body, successCallback, errorCallback) {
  myFetch("DELETE", endpoint, body, successCallback, errorCallback);
}

export const alertError = (error) => {
  alert(error.code + (error.msg ? ": " + error.msg : ""));
};

function myFetch(method, endpoint, body, successCallback, errorCallback) {
  let url = AppConfig.API + endpoint;

  body = JSON.stringify(body);

  let headers = defaultHeaders;
  headers["Authorization"] = "bearer " + getAccessToken();
  headers["Accept-Language"] = "en-US,en;q=0.5";

  let response = null;

  if (body === undefined)
    response = fetch(url, {
      method: method,
      headers: headers,
    });
  else {
    response = fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });
  }
  handleResponse(response, successCallback, errorCallback);
}

const handleResponse = (response, successCallback, errorCallback) => {
  response
    .then((r) => {
      if (r.status === 200) {
        if (successCallback) {
          r.json().then((result) => {
            successCallback(result);
          });
        }
      } else if (r.status === 403) {
        throwError(errorCallback, "Forbidden");
        toast.error("Forbidden");
      } else if (r.status === 401) {
        console.log("Unauthorized");
        logout();
      } else if (r.status === 500) {
        r.json().then((result) => {
          errorCallback(result);
        });
        // throwError(null, "Internal server error");
      } else if (r.status === 502) {
        throwError(null, "Service unavailable");
      } else if (r.status === 526) {
        throwError(null, "Please connect to VPN");
      } else {
        toast.error(
          `Status: ${r.status}. Title: ${r.title}. Detail: ${r.detail}`
        );
      }
    })
    .catch((error) => {
      console.log(error);
      logout();
    });
};

const throwError = (errorCallback, message) => {
  if (errorCallback) errorCallback(message);
  else showError(message);
};

const showError = (message) => {
  toast.error("ERR: " + message);
};
