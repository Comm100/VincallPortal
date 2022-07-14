import { useEffect, useRef, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId, log } from "../../Helpers/Index";
import { Embedded } from "./Embedded";
import { GlobalSettings } from "./types";

export const AgentConsolePanel = () => {
  const elementId = "comm100-agentconsole";
  useComm100Snippet(elementId, install);
  return <div id={elementId} style={{ height: "700px" }}></div>;
};

export const useComm100Snippet = (
  elementId: string,
  install: (arg: GlobalSettings, elementId: string, siteId: number) => any
) => {
  const dataProvider = useDataProvider();
  const uninstallRef = useRef<any>(null);
  const siteId = getConnectSiteId();
  useEffect(() => {
    dataProvider
      .httpGet("globalSetting", { type: "installcode" })
      .then(({ data = [] }: { data: any[] }) => {
        const obj = data.reduce((pre, current) => {
          pre[current.key] = current.value;
          return pre;
        }, {}) as GlobalSettings;
        uninstallRef.current = install(obj, elementId, siteId);
      });
    return () => {
      if (uninstallRef.current) {
        uninstallRef.current();
      }
    };
  }, []);
};

const install = (arg: GlobalSettings, elementId: string, siteId: number) => {
  let s2: any;

  const s = document.createElement("script");
  s.src = arg.agentConsole;
  s.async = true;
  s.onload = () => {
    s2 = document.createElement("script");
    s2.innerHTML = `
    var ac = new EmbeddedAgentConsole({
      appId: "${arg.agentAppId}",
      siteId: ${siteId},
      isShowLogout: false,
      isShowExit: false,
      container: document.getElementById("${elementId}"),
    });
    ac.init().then(client=>{
      console.log("AgentConsolePanel", client);
      window.top.__comm100_client = client;
      window.top.Runtime.init();
    });
    `;
    document.body.appendChild(s2);
  };
  document.body.appendChild(s);
  return () => {
    if (s && s.parentNode) {
      s.parentNode.removeChild(s);
    }
    if (s2 && s2.parentNode) {
      s2.parentNode.removeChild(s2);
    }
  };
};
