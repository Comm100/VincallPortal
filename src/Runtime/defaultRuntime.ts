import { APPAPI } from "comm100-app/type";
import { notification } from "../Helpers/Index";
import { checkIfAgentFree } from "./comm100Runtime";
import { RuntimeInterface } from "./index";

const getAppClient = (): APPAPI => {
  // @ts-ignore
  return window.__comm100_client;
};

const noop = () => {};

export const defaultRuntime = {
  eventHandler: {},
  on(eventName: "busy" | "free", callback: () => void) {
    this.eventHandler[eventName] = callback;
    return this;
  },
  init() {
    const client = getAppClient();
    console.log("Ray: Runtime", client);
    if (!client) {
      return;
    }
    client.on("agentconsole.navBar.select", (leftTab: any) => {
      console.log("Ray: agentconsole.navBar.select", leftTab);
    });

    client.on("agentconsole.chat.request", (args: any) => {
      console.log("Ray: agentconsole.chat.request", args);
      notification("New chat comes");
    });

    client.on("agentconsole.chats.chatStarted", (args: any) => {
      console.log("Ray: chatStarted", args);
      if (this.eventHandler.busy) {
        this.eventHandler.busy();
      }
      notification("Chat starts.");
    });

    client.on("agentconsole.chats.chatEnded", (args: any) => {
      console.log("Ray: chatEnded", args);
      checkIfAgentFree(client, this);
      notification("Chat ends.");
    });
  },
  sendNotify: notification,
  updateAgentStatus(status: "online" | "away") {
    const client = getAppClient();
    if (!client) {
      return;
    }
    client.set("currentAgent.status", status);
  },
  updateTopbarStatus: noop,
} as RuntimeInterface;
