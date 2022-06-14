import { Box, CircularProgress } from "@mui/material";
import { useGetIdentity } from "react-admin";
import { APPClient } from "comm100-app";
import { callPanelPageApp } from "./CallPanelPageApp";
import { useEffect, useRef } from "react";
import { Runtime } from "../../Runtime/index";
import { CallScreen } from "../../Components/CallScreen";
import { toCallTimeString } from "../../Helpers/Index";

let time = 0;

export const PhoneDialer = () => {
  const {
    deviceState,
    currentAgentId,
    currentAgentObject,
    agentList,
    deviceManager,
    isCallDisabled,
    handleCurrentAgentChange,
    updateDevice,
    clearCallTimeTask,
    disableCallWhenAgentBusy,
    enableCallWhenAgentFree,
  } = callPanelPageApp({});
  const { identity } = useGetIdentity();
  const intervalTaskId = useRef<any>(null);

  useEffect(() => {
    if (currentAgentId) {
      updateDevice(currentAgentId);
    }
  }, [currentAgentId]);

  useEffect(() => {
    if (!!agentList.length && identity?.account) {
      const currentAgent = agentList.find(
        (item) => item.userAccount === identity?.account
      ) || { id: "" };
      handleCurrentAgentChange({
        target: { value: (currentAgent.id as any) || (agentList[0].id as any) },
      });
    }
  }, [!!agentList.length, identity?.account]);

  useEffect(() => {
    Runtime.on("busy", disableCallWhenAgentBusy)
      .on("free", enableCallWhenAgentFree)
      .init();

    return () => {
      clearCallTimeTask();
      if (deviceManager) {
        deviceManager.clear();
      }
    };
  }, []);

  useEffect(() => {
    console.log("deviceState.status", deviceState.status);
    const appClient = APPClient.init();
    switch (deviceState.status) {
      case "incoming":
      case "incomingAccept":
      case "outingCallingAccept":
      case "outingCalling":
        {
          const updateInfo = {
            id: "vincall-phone",
            icon: "./images/calling.png",
            label: "",
            tooltip: "On Call.",
          };
          if (
            deviceState.status === "incomingAccept" ||
            deviceState.status === "outingCallingAccept"
          ) {
            if (intervalTaskId.current) {
              clearInterval(intervalTaskId.current);
              intervalTaskId.current = null;
            }
            updateInfo.label = toCallTimeString(time);
            appClient.set("agentconsole.topBar.buttons", updateInfo);
            intervalTaskId.current = setInterval(() => {
              updateInfo.label = toCallTimeString(time++);
              appClient.set("agentconsole.topBar.buttons", updateInfo);
            }, 1000);
          }

          appClient.do("agentconsole.popper.open", {
            widgetId: "vincall-phone",
            url: "https://wwwtest.vincall.net/#/phonedialer",
            width: 337,
            height: 585,
          });
        }
        break;
      default:
        appClient.set("agentconsole.topBar.buttons", {
          id: "vincall-phone",
          icon: "./images/default.png",
          label: "",
          tooltip: "Available.",
        });
        if (intervalTaskId.current) {
          clearInterval(intervalTaskId.current);
          intervalTaskId.current = null;
        }
        time = 0;
        break;
    }
  }, [deviceState.status]);

  if (deviceState.status === "initializing") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ pt: 2 }}>
      <CallScreen
        currentAgent={currentAgentId}
        currentAgentNumber={currentAgentObject.deviceNumber}
        deviceManager={deviceManager!}
        deviceState={deviceState}
        disabled={isCallDisabled}
      />
    </Box>
  );
};

export interface AgentBo {
  id: number;
  deviceNumber: string;
  userAccount: string;
  remark: string;
  state: number;
  createDate: string;
}
