import { isEmbeddedMode } from "../Helpers/Index";
import { AgentCallStatus } from "../Pages/CallPanel/types";
import { comm100Runtime } from "./comm100Runtime";
import { defaultRuntime } from "./defaultRuntime";

export const isEmbed: boolean = isEmbeddedMode;

export const Runtime: RuntimeInterface = isEmbed
  ? comm100Runtime
  : defaultRuntime;

export interface RuntimeInterface {
  eventHandler: { [key: string]: () => void };
  init: () => void;
  sendNotify: (message: string) => void;
  updateAgentStatus: (status: "online" | "away") => void;
  on: (eventName: "busy" | "free", callback: () => void) => RuntimeInterface;
}

// @ts-ignore
window.Runtime = Runtime;
