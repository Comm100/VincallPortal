import { notification } from "../Helpers/Index";
import { RuntimeInterface } from "./index";

const getAppClient = (): any => {
  // @ts-ignore
  return window.__comm100_client;
};

export const checkIfAgentFree = (
  clientInstance: any,
  runtime: RuntimeInterface
) => {
  clientInstance.get("currentAgent").then((agent: any) => {
    console.log("Ray: currentAgent", agent);
    if ((agent.data || agent).chats <= 0) {
      if (runtime.eventHandler.free) {
        runtime.eventHandler.free();
      }
    }
  });
};

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

    client.on("agentconsole.livechat.chat.request", (args: any) => {
      console.log("Ray: agentconsole.livechat.chat.request", args);
      notification("New chat comes");
    });

    client.on("agentconsole.livechat.chats.chatStarted", (args: any) => {
      console.log("Ray: agentconsole.livechat.chats.chatStarted", args);
      if (this.eventHandler.busy) {
        this.eventHandler.busy();
      }
      notification("Chat starts.");
    });

    client.on("agentconsole.livechat.chats.chatEnded", (args: any) => {
      console.log("Ray: agentconsole.livechat.chats.chatEnded", args);
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
  }
} as RuntimeInterface;
