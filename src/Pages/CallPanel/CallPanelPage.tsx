import { Card, Box, Tabs, Tab } from "@mui/material";
import { Title, useGetIdentity } from "react-admin";
import { CTabPanel } from "../../Components/Tabs/CTabPanel";
import { callPanelPageApp } from "./CallPanelPageApp";
import { useEffect } from "react";
import { CallTabContent } from "./CallTabContent";
import { isEmbeddedMode } from "../../Helpers/Index";
import { Runtime } from "../../Runtime/index";
import { AgentConsolePanel } from "./AgentConsolePanel";
import { useIsComm100Connect } from "../../Helpers/useIsComm100Connect";
import { AgentCallStatusIcon, Comm100StatusIcon } from "./AgentCallStatusIcon";

export const CallPanelPage = () => {
  const {
    tab,
    deviceState,
    currentAgentId,
    currentAgentObject,
    agentList,
    isAgentLoading,
    deviceManager,
    isCallDisabled,
    agentStatus,
    chatStatus,
    handleCurrentAgentChange,
    updateDevice,
    handleTabChange,
    clearCallTimeTask,
    disableCallWhenAgentBusy,
    enableCallWhenAgentFree,
    handleCall,
  } = callPanelPageApp({ whichPage: "callpanel" });

  const { identity } = useGetIdentity();
  const isComm100Connect = useIsComm100Connect();

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
  if (isEmbeddedMode) {
    return (
      <Card sx={{ p: 3, mt: 3 }}>
        <Title title="Call Panel" />
        <CallTabContent
          isAgentLoading={isAgentLoading}
          currentAgentId={currentAgentId}
          currentAgentObject={currentAgentObject}
          agentList={agentList}
          deviceState={deviceState}
          deviceManager={deviceManager}
          handleCurrentAgentChange={handleCurrentAgentChange}
          disabled={isCallDisabled}
          onCallClick={handleCall}
        />
      </Card>
    );
  }
  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Title title="Call Panel" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              fontSize: "1rem",
              minHeight: "48px",
              paddingLeft: 6,
              paddingRight: 6,
            },
            "& .MuiSvgIcon-root": {
              marginLeft: 0.5,
              position: "relative",
              top: "-1px",
            },
          }}
        >
          <Tab
            label="Call"
            iconPosition="end"
            icon={<AgentCallStatusIcon status={agentStatus} />}
          />
          {isComm100Connect ? (
            <Tab
              label="Chat"
              iconPosition="end"
              icon={<Comm100StatusIcon status={chatStatus} />}
            />
          ) : null}
        </Tabs>
      </Box>
      <CTabPanel value={tab} index={0}>
        <CallTabContent
          isAgentLoading={isAgentLoading}
          currentAgentId={currentAgentId}
          currentAgentObject={currentAgentObject}
          agentList={agentList}
          deviceState={deviceState}
          deviceManager={deviceManager}
          disabled={isCallDisabled}
          handleCurrentAgentChange={handleCurrentAgentChange}
          onCallClick={handleCall}
        />
      </CTabPanel>
      {isComm100Connect ? (
        <CTabPanel value={tab} index={1}>
          <AgentConsolePanel />
        </CTabPanel>
      ) : null}
    </Card>
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
