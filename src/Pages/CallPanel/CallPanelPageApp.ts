import { useMemo, useRef, useState } from "react";
import {
  DataProvider,
  useDataProvider,
  useGetIdentity,
  useGetList,
} from "react-admin";
import { useEventCallback } from "@mui/material";
import { log } from "../../Helpers/Index";
import { ChangeEvent } from "../../types";
import { AgentBo } from "./CallPanelPage";
import { DeviceManager } from "./DeviceManager";
import { AgentCallStatus, DeviceState } from "./types";
import { Runtime } from "../../Runtime/index";
import { Comm100ChatStatus } from "./AgentCallStatusIcon";

export const callPanelPageApp = ({ whichPage }: { whichPage?: string }) => {
  const [currentAgentId, setCurrentAgentId] = useState<string>("");
  const [tab, setTab] = useState<number>(0);
  const dataProvider = useDataProvider();
  const deviceManager = useRef<DeviceManager>();
  const updateCallTimeTaskId = useRef<any>();
  const { identity } = useGetIdentity();
  const [isCallDisabled, setIsCallDisabled] = useState<boolean>(false);
  const [agentStatus, setAgentStatus] = useState<AgentCallStatus>("Available");
  const [chatStatus, setChatStatus] = useState<Comm100ChatStatus>("Online");

  const { data: agentList = [], isLoading: isAgentLoading } =
    useGetList<AgentBo>(
      "agents",
      {
        pagination: null as any,
      },
      {
        refetchInterval: -1,
        retry: 1,
      }
    );

  const [deviceState, setDeviceState] = useState<DeviceState>({
    status: "initializing",
  });

  const currentAgentObject = useGetCurrentAgentObject(
    currentAgentId,
    agentList
  );

  const requestForUpdateCallTime = () => {
    if (isCallDisabled) {
      return;
    }
    log("request update call time start.");
    dataProvider.httpGet(`agent/${currentAgentId}/updatetime`);
  };

  const requestForUpdateStatusToOnline = () => {
    dataProvider.httpGet(`agent/${currentAgentId}/updateStatusToOnline`);
  };

  const setupUpdateCallTimeTask = () => {
    if (updateCallTimeTaskId.current) {
      clearInterval(updateCallTimeTaskId.current);
    }
    if (isCallDisabled) {
      return;
    }
    updateCallTimeTaskId.current = setInterval(requestForUpdateCallTime, 5000);
  };

  const clearCallTimeTask = () => {
    if (updateCallTimeTaskId.current) {
      log("request for update call time end.");
      clearInterval(updateCallTimeTaskId.current);
      updateCallTimeTaskId.current = null;
    }
  };

  const handleUpdateDeviceState = useEventCallback(
    (state: Partial<DeviceState>, shouldUseAssign?: boolean) => {
      if (shouldUseAssign) {
        setDeviceState(Object.assign({}, deviceState, state));
      } else {
        setDeviceState(state as any);
      }

      if (state.status === "ready") {
        log("Ray: handleUpdateDeviceState ready");
        setAgentStatus("Available");
        if (currentAgentObject && identity) {
          if (currentAgentObject.userAccount === identity.account) {
            setupUpdateCallTimeTask();
          } else {
            clearCallTimeTask();
          }
        }
      } else if (state.status === "incoming") {
        // Agent is in a call.
        Runtime.sendNotify(`${state.from} is calling.`);
      } else if (
        state.status === "incomingAccept" ||
        state.status === "outingCallingAccept"
      ) {
        setAgentStatus("On Call");
        setChatStatus("Away");
        Runtime.updateAgentStatus("away");
        if (whichPage === "callpanel") {
          Runtime.updateTopbarStatus("Do not disturb");
        }
      } else if (state.status === "end") {
        requestForUpdateStatusToOnline();
        // Agent is out of a call.
        Runtime.updateAgentStatus("online");
        setChatStatus("Online");
        setAgentStatus("Available");
        if (whichPage === "callpanel") {
          Runtime.updateTopbarStatus("Available");
        }
      }
    }
  );

  const disableCallWhenAgentBusy = useEventCallback(() => {
    log("Ray: disableCallWhenAgentBusy");
    if (deviceManager.current) {
      deviceManager.current.clear();
    }
    setIsCallDisabled(true);
    setAgentStatus("Do not disturb");
  });

  const enableCallWhenAgentFree = useEventCallback(() => {
    log("Ray: enableCallWhenAgentFree");
    updateDevice(currentAgentId);
    setIsCallDisabled(false);
  });

  const handleCurrentAgentChange = (e: ChangeEvent<string>) => {
    clearCallTimeTask();
    setCurrentAgentId(e.target.value);
  };

  const updateDevice = async (currentAgentId: string) => {
    handleUpdateDeviceState({ status: "initializing" });
    const tokenResponse = await getTwilioToken(dataProvider, currentAgentId);

    if (tokenResponse && tokenResponse.data && tokenResponse.data.token) {
      if (deviceManager.current) {
        deviceManager.current.clear();
      }
      deviceManager.current = new DeviceManager({
        token: tokenResponse.data.token,
        identity: tokenResponse.data.identity,
        updateState: handleUpdateDeviceState,
      });
      deviceManager.current.catch((e: any) => {
        log("Device error", e);
      });
      deviceManager.current.tokenGetter = async () => {
        const data = await getTwilioToken(dataProvider, currentAgentId);
        return data.token;
      };
      return deviceManager.current;
    }
  };

  const handleTabChange = (e: any, newValue: any) => {
    setTab(newValue);
  };

  const handleCall = (number: any) => {
    deviceManager.current?.makeOutgoingCall(number);
  };

  return {
    tab,
    agentList,
    isAgentLoading,
    deviceState,
    currentAgentId,
    currentAgentObject,
    deviceManager: deviceManager.current,
    isCallDisabled,
    agentStatus,
    chatStatus,
    handleCurrentAgentChange,
    updateDevice,
    handleTabChange,
    setupUpdateCallTimeTask,
    clearCallTimeTask,
    disableCallWhenAgentBusy,
    enableCallWhenAgentFree,
    handleCall,
  };
};

const getTwilioToken = async (dataProvider: DataProvider, agentId: string) => {
  const res = await dataProvider.httpGet("twilioToken", { agentId });
  return res;
};

const useGetCurrentAgentObject = (currentAgent: string, agentList: any[]) => {
  return useMemo(() => {
    if (agentList.length) {
      return agentList.find((item) => item.id === currentAgent) || {};
    }
    return {};
  }, [currentAgent, agentList.length]);
};
