import { APPClient } from "comm100-app";
import { APPAPI } from "comm100-app/type";
import { AgentCallStatus } from "../Pages/CallPanel/types";
import { RuntimeInterface } from "./index";

let client: APPAPI;

export const comm100Runtime: RuntimeInterface = {
  eventHandler: {},
  on(eventName: "busy" | "free", callback: () => void) {
    this.eventHandler[eventName] = callback;
    return this;
  },
  init() {
    client = APPClient.init();

    client.on("agentconsole.navBar.select", (leftTab) => {
      console.log("Ray: agentconsole.navBar.select", leftTab);
    });

    client.on("agentconsole.chats.chatStarted", (args: any) => {
      console.log("Ray: chatStarted", args.chat);
      if (this.eventHandler.busy) {
        this.eventHandler.busy();

        client.set("agentconsole.topBar.buttons", {
          id: "vincall-top-bar",
          tooltip: "Do Not Disturb.",
        });
      }
    });

    client.on("agentconsole.chats.chatEnded", (args: any) => {
      console.log("Ray: chatEnded", args.chat);
      checkIfAgentFree(client, this);
    });
  },

  sendNotify(message: string) {
    console.log("Ray: agentconsole.notification.notify");
    client.do("agentconsole.notification.notify", {
      title: "New Call",
      message,
    });
  },

  updateAgentStatus(status: "online" | "away") {
    client.set("currentAgent.status", status);
  },
  updateTopbarStatus(status: AgentCallStatus) {
    if (status === "Available") {
      client.set("agentconsole.topBar.buttons", {
        id: "vincall-top-bar",
        icon: "./images/default.png",
        label: "",
        tooltip: "On Call.",
      });
    } else if (status === "Do not disturb") {
      client.set("agentconsole.topBar.buttons", {
        id: "vincall-top-bar",
        icon: "./images/calling.png",
        label: "",
        tooltip: "On Call.",
      });
    }
  },
};

export const checkIfAgentFree = (client: APPAPI, runtime: RuntimeInterface) => {
  client.get("currentAgent").then((agentArgs) => {
    const agent = agentArgs.data;
    console.log("Ray: currentAgent", agent);
    if (agent.chats <= 0) {
      if (runtime.eventHandler.free) {
        runtime.eventHandler.free();
      }
      client.set("agentconsole.topBar.buttons", {
        id: "vincall-top-bar",
        tooltip: "Available.",
      });
    }
  });
};
