import { DeviceState } from "../Pages/CallPanel/types";

type ChannelType = "deviceStatus" | "agentStatus";

type AgentCallStatus = "available" | "onCall" | "doNotDisturb" | "offline";

type PropType<TObject, TProp extends keyof TObject> = TObject[TProp];

export type TransferPayload<T extends ChannelType> = {
  type: T extends "deviceStatus"
    ? PropType<DeviceState, "status">
    : AgentCallStatus;
  message?: any;
};

export type TransferMessage<T extends ChannelType> = {
  channel: T;
  payload: TransferPayload<T>;
};

export const transferMessage = async <T extends ChannelType>(
  channelType: T,
  payload: TransferPayload<T>
) => {
  const data = {
    channel: channelType,
    payload: payload
  };
  console.log("window.parent.postMessage", data);
  window.parent.postMessage(data, "*");
};
