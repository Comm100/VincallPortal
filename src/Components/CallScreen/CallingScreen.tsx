import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { NumberButton } from "./NumberButton";
import MicOffIcon from "@mui/icons-material/MicOff";
import AppsIcon from "@mui/icons-material/Apps";
import PauseIcon from "@mui/icons-material/Pause";
import CallIcon from "@mui/icons-material/Call";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DeviceState } from "../../Pages/CallPanel/types";

export interface CallingScreenProps {
  currentAgentNumber?: string;
  deviceState: DeviceState;
  onEnd: () => void;
  onAcceptIncoming: () => void;
  onRejectIncoming: () => void;
  onToggleMute: () => void;
}

export const CallingScreen = ({
  currentAgentNumber,
  deviceState,
  onAcceptIncoming,
  onRejectIncoming,
  onEnd,
  onToggleMute,
}: CallingScreenProps) => {
  const handleActionClick = (actionType?: string | number) => {
    switch (actionType) {
      case "acceptIncoming":
        onAcceptIncoming();
        break;
      case "rejectIncoming":
        onRejectIncoming();
        break;
      case "endCall":
        onEnd();
        break;
      case "mute":
        onToggleMute();
        break;
      case "keypad":
        break;
      case "speaker":
        break;
      case "hold":
        break;
      default:
        return;
    }
  };
  const actionsActiveState = getActionsActiveState(deviceState);
  return (
    <Paper
      sx={{ width: 240, height: 486, padding: 4, boxSizing: "content-box" }}
      elevation={1}
    >
      <Box sx={{ textAlign: "center" }}>
        <AccountCircleIcon sx={{ fontSize: 72, margin: "0 atuo" }} />
      </Box>

      <div style={{ textAlign: "center" }}>
        <ContactInfo
          deviceState={deviceState}
          currentAgentNumber={currentAgentNumber}
        />
      </div>

      <Grid container>
        {actionItems.map((action, index) => {
          const Icon = action.icon;
          return (
            <Grid item xs={4} key={index} sx={{ padding: 1 }}>
              {action.name === "placeholder" ? null : (
                <NumberButton
                  character={action.name}
                  onClick={handleActionClick}
                  active={actionsActiveState[action.name]}
                >
                  <Icon />
                </NumberButton>
              )}
            </Grid>
          );
        })}
        {(deviceState.status === "outingCalling" ||
          deviceState.status === "outingCallingAccept" ||
          deviceState.status === "incomingAccept") && (
          <Grid
            item
            xs={12}
            key="endCall"
            sx={{ display: "flex", justifyContent: "center", padding: 1 }}
          >
            <NumberButton
              character="endCall"
              onClick={handleActionClick}
              color="error"
              variant="contained"
            >
              <CallIcon sx={{ transform: "rotate(135deg)" }} />
            </NumberButton>
          </Grid>
        )}
        {deviceState.status === "incoming" && (
          <>
            <Grid
              item
              xs={6}
              key="acceptIncoming"
              sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}
            >
              <NumberButton
                character="acceptIncoming"
                onClick={handleActionClick}
                color="success"
                variant="contained"
              >
                <CallIcon />
              </NumberButton>
            </Grid>
            <Grid
              item
              xs={6}
              key="rejectIncoming"
              sx={{ display: "flex", justifyContent: "start", padding: 1 }}
            >
              <NumberButton
                character="rejectIncoming"
                onClick={handleActionClick}
                color="error"
                variant="contained"
              >
                <CallIcon sx={{ transform: "rotate(135deg)" }} />
              </NumberButton>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

const ContactInfo = ({
  deviceState,
  currentAgentNumber,
}: {
  deviceState: DeviceState;
  currentAgentNumber?: string;
}) => {
  if (deviceState.status === "outingCalling") {
    return (
      <>
        <div>Calling... </div>
        <div>From: {currentAgentNumber}</div>
        <div>To: {deviceState.to}</div>
      </>
    );
  }
  if (deviceState.status === "outingCallingAccept") {
    return (
      <>
        <div>Connected!</div>
        <div>From: {currentAgentNumber}</div>
        <div>To: {deviceState.to}</div>
      </>
    );
  }

  if (deviceState.status === "incoming") {
    return (
      <>
        <div>Incoming... </div>
        <div>From: {deviceState.from}</div>
      </>
    );
  }

  if (deviceState.status === "incomingAccept") {
    return (
      <>
        <div>Connected! </div>
        <div>From: {deviceState.from}</div>
      </>
    );
  }
  return null;
};

interface ActionItem {
  name: string;
  label: string;
  icon: React.ComponentFactory<any, any>;
}

const actionItems: ActionItem[] = [
  { name: "mute", label: "Mute", icon: MicOffIcon },
  { name: "keypad", label: "Keypad", icon: AppsIcon },
  { name: "hold", label: "Hold", icon: PauseIcon },
  { name: "placeholder", label: "", icon: () => null as any },
  { name: "placeholder", label: "", icon: () => null as any },
  { name: "placeholder", label: "", icon: () => null as any },
];

const getActionsActiveState = (deviceState: DeviceState) => {
  let state: { [key: string]: boolean } = {};
  if ((deviceState as any).isMuted) {
    state["mute"] = true;
  }
  if ((deviceState as any).isHold) {
    state["hold"] = true;
  }
  return state;
};
