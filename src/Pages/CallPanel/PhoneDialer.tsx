import { Box, CircularProgress } from "@mui/material";
import { useGetIdentity } from "react-admin";
import { callPanelPageApp } from "./CallPanelPageApp";
import { useEffect } from "react";
import { Runtime } from "../../Runtime/index";
import { CallScreen } from "../../Components/CallScreen";

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
    enableCallWhenAgentFree
  } = callPanelPageApp({});
  const { identity } = useGetIdentity();

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
        target: { value: (currentAgent.id as any) || (agentList[0].id as any) }
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
