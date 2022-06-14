import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";
import { EnvConfig } from "../../../EnvConfig";
import { ConnectInfo } from "./ConnectPageApp";

export interface ConnectComm100AppProps {
  setConnected: any;
  triggerPageRefresh: (connected?: boolean) => void;
  connectInfo: ConnectInfo;
}

export interface ConnectComm100ButtonApp {
  handleConnect: (values: { siteId: string }) => void;
  handleDisconnect: () => void;
}

export const connectComm100App = ({
  setConnected,
  triggerPageRefresh,
  connectInfo,
}: ConnectComm100AppProps): ConnectComm100ButtonApp => {
  const handleConnect = (values: { siteId: string }) => {
    const siteId = values.siteId;
    localStorage.setItem("connectSiteId", siteId || "");
    const redirect_url = `${EnvConfig.serverUrl}/sso/connectcallback?siteId=${siteId}&domain=${connectInfo.domain}`;
    const url = `${
      EnvConfig.routeUrl
    }/oauth/authorize?siteId=${siteId}&client_id=${
      connectInfo.clientId
    }&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=code`;
    // @ts-ignore
    window.__refreshComm100Connect = triggerPageRefresh;
    const win = window.open(
      url,
      "ConnectPage",
      `
        width = 500,
        height = 678,
        left= ${window.innerWidth / 2 - 250},
        top = ${window.innerHeight / 2 - 339},
        menubar = false,
        toolbar = false,
        location = false,
        resizable = true,
        scrollbars = true
      `
    );
  };

  const handleDisconnect = () => {
    customHttpClient(
      `${getServerURL()}/connectState/disconnect?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "PUT",
      }
    ).then((res: any) => setConnected(res.json.connected));
  };

  return {
    handleConnect,
    handleDisconnect,
  };
};
