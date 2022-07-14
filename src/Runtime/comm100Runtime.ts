import { RuntimeInterface } from "./index";

const noop = () => {};

type TransferData = "agent-busy" | "agent-free";

export const comm100Runtime: RuntimeInterface = {
  eventHandler: {},
  on(eventName: "busy" | "free", callback: () => void) {
    this.eventHandler[eventName] = callback;
    return this;
  },
  init() {
    const target = this;
    const handleMessage = (event: MessageEvent<TransferData>) => {
      switch (event.data) {
        case "agent-busy":
          if (target.eventHandler.busy) {
            target.eventHandler.busy();
          }
          break;
        case "agent-free":
          if (target.eventHandler.free) {
            target.eventHandler.free();
          }
          break;
      }
    };
    window.addEventListener("message", handleMessage, false);
  },

  sendNotify: noop,
  updateAgentStatus: noop
};
