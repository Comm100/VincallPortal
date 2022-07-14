import { AuthProvider } from "react-admin";
import { getServerURL } from "../App";
import { customHttpClient } from "../DataProvider/customHttpClient";
import { isEmbeddedMode } from "../Helpers/Index";

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
      if (isEmbeddedMode) {
        goToOauth();
        return Promise.resolve() as any;
      }
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

const goToOauth = () => {
  const search = getSearch() as any;
  const query = `domain=${search.domain}&siteId=${search.siteId}`;
  const entryUrl = location.href;
  const domain = location.protocol + "//" + location.host;
  if (entryUrl.indexOf("#/reports") !== -1) {
    location.href = `/oauth/login?returnuri=${domain}/oauth/logonreports&${query}`;
  } else if (entryUrl.indexOf("#/phoneDialer") !== -1) {
    location.href = `/oauth/login?returnuri=${domain}/oauth/logonphonedialer&${query}`;
  } else {
    location.href = `/oauth/login?returnuri=${domain}/oauth/logoncallpanel&${query}`;
  }
};

function getSearch() {
  var search = decodeURIComponent(location.href).split("?")[1] || "",
    searchList = search.split("&").map((item) => item.split("=")) || [],
    searchObject = searchList.reduce((pre, current) => {
      // @ts-ignore
      pre[current[0]] = current[1];
      return pre;
    }, {});
  return searchObject;
}
