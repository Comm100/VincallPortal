export enum DeviceEventName {
  Error = "error",
  Incoming = "incoming",
  Registered = "registered",
  Registering = "registering",
  TokenWillExpire = "tokenWillExpire",
}

export enum CallEventName {
  Accept = "accept",
  Disconnect = "disconnect",
  Reject = "reject",
  Cancel = "cancel",
  Mute = "mute",
}

export interface Connection {
  accept: () => void;
}

export interface DeviceError {
  message: string;
}

export type DeviceState =
  | {
      status:
        | "initializing"
        | "ready"
        | "end"
        | "outingCallingReject"
        | "incomingReject";
    }
  | DeviceStateOutingCalling
  | DeviceStateIncoming;

export interface DeviceStateOutingCalling {
  status: "outingCalling" | "outingCallingAccept";
  to: string;
  isMuted: boolean;
  isHold: boolean;
  isShowKeyboard: boolean;
}

export interface DeviceStateIncoming {
  status: "incoming" | "incomingAccept";
  from: string;
  isMuted: boolean;
  isHold: boolean;
  isShowKeyboard: boolean;
}

export type AgentCallStatus =
  | "Available"
  | "On Call"
  | "Do not disturb"
  | "Offline";

export interface GlobalSettings {
  agentConsole: string; // domin url
  controlPanel: string; // domin url
  agentAppId: string;
  controlAppId: string;
}
