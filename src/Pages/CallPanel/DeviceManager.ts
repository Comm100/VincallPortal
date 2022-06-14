import { Device, Call } from "@twilio/voice-sdk";
import { log } from "../../Helpers/Index";
import { CallEventName, DeviceEventName, DeviceState } from "./types";

export interface DeviceManagerProps {
  token: string;
  identity: string;
  updateState: (state: Partial<DeviceState>, shouldUseAssign?: boolean) => void;
}

export class DeviceManager {
  identity: string;
  token: string;
  updateState: (state: Partial<DeviceState>, shouldUseAssign?: boolean) => void;
  device: Device;
  call?: Call;
  onError: (error: any) => void;
  tokenGetter: () => Promise<string>;
  constructor({ token, identity, updateState }: DeviceManagerProps) {
    this.token = token;
    this.identity = identity;
    this.updateState = updateState;
    this.onError = () => {};
    this.tokenGetter = () => Promise.resolve("");
    this.device = this.createDevice(token);
    this.setup(this.device, updateState);
  }
  catch(handler: (error: any) => void) {
    this.onError = handler;
  }

  public async makeOutgoingCall(to: string) {
    if (!to) {
      return;
    }
    if (!this.device || this.device.state !== Device.State.Registered) {
      return;
    }
    const params = {
      To: to,
      callingDeviceIdentity: this.identity,
    };
    const call = await this.device.connect({ params });
    const updateState = this.updateState;
    this.call = call;

    updateState({ status: "outingCalling", to });
    call.on(CallEventName.Accept, () => {
      updateState({
        status: "outingCallingAccept",
        to,
      });
    });

    call.on(CallEventName.Cancel, () => {
      updateState({ status: "end" });
      this.clearCall();
    });

    call.on(CallEventName.Disconnect, () => {
      updateState({ status: "end" });
      this.clearCall();
    });

    call.on(CallEventName.Reject, () => {
      updateState({ status: "outingCallingReject" });
    });

    call.on(CallEventName.Mute, (isMuted: boolean) => {
      updateState({ isMuted }, true);
    });
  }

  public disconnectCall() {
    if (this.call) {
      this.call.disconnect();
    }
  }

  public acceptIncoming() {
    if (this.call) {
      this.call.accept();
    }
  }

  public rejectIncoming() {
    if (this.call) {
      this.call.reject();
    }
  }

  public toggleMute() {
    if (this.call) {
      this.call.mute(!this.call.isMuted());
    }
  }

  public clear() {
    if (this.call) {
      this.call.removeAllListeners();
    }
    if (this.device) {
      this.device.destroy();
    }
  }

  private clearCall() {
    if (this.call) {
      this.call.removeAllListeners();
      this.call = null as any;
    }
  }

  private setup(
    device: Device,
    updateState: (
      state: Partial<DeviceState>,
      shouldUseAssign?: boolean
    ) => void
  ) {
    device.on(DeviceEventName.Registered, () => {
      updateState({ status: "ready" });
    });
    device.on(DeviceEventName.Error, (error, call) => {
      log("An error has occurred: ", error);
      this.onError(error);
    });

    device.on(DeviceEventName.Incoming, (call) => {
      log("Incoming call from", call);
      this.call = call;
      updateState({ status: "incoming", from: call.parameters.From });

      call.on(CallEventName.Accept, () => {
        updateState({ status: "incomingAccept", from: call.parameters.From });
      });

      call.on(CallEventName.Cancel, () => {
        updateState({ status: "end" });
        this.clearCall();
      });

      call.on(CallEventName.Disconnect, () => {
        updateState({ status: "end" });
        this.clearCall();
      });

      call.on(CallEventName.Reject, () => {
        // updateState({ status: "incomingReject" });
        updateState({ status: "end" });
      });

      call.on(CallEventName.Mute, (isMuted: boolean) => {
        updateState({ isMuted }, true);
      });
    });

    device.on(DeviceEventName.TokenWillExpire, async () => {
      const token = await this.tokenGetter();
      device.updateToken(token);
    });
    device.register();
  }

  private createDevice(token: string) {
    return new Device(token, {
      appName: "VinCall",
      appVersion: "1.0.0",
    });
  }
}
