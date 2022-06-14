import { AuthProvider } from "react-admin";
import { getServerURL } from "../App";
import { customHttpClient } from "../DataProvider/customHttpClient";

export interface Auth {
  username: string;
  password: string;
}

export const authProvider: AuthProvider = {
  login: (auth: Auth) => {
    return customHttpClient(`${getServerURL()}/vincallToken`, {
      method: "POST",
      body: JSON.stringify(auth),
    })
      .then((res) => {
        localStorage.setItem("userName", res.json.userName);
        localStorage.setItem("userId", res.json.userId);
        localStorage.setItem("vincallRole", res.json.role);
        localStorage.setItem("userAccount", res.json.userAccount);
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  },
  logout: () => {
    return customHttpClient(`${getServerURL()}/logout`, {
      method: "GET",
    })
      .then(() => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("vincallRole");
        localStorage.removeItem("userAccount");
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  },
  checkAuth: () => {
    return Promise.resolve();
  },
  checkError: (error: any) => {
    if (error.status === 401) {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("vincallRole");
      localStorage.removeItem("userAccount");
      return Promise.reject("Please login again.");
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    return Promise.resolve({
      id: localStorage.getItem("userId") || "Unknown",
      fullName: localStorage.getItem("userName") || "Unknown",
      account: localStorage.getItem("userAccount") || "",
      role: localStorage.getItem("vincallRole"),
    });
  },
  getPermissions: () => {
    return Promise.resolve(localStorage.getItem("vincallRole"));
  },
};
