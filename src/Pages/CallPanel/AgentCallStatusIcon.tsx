import { AgentCallStatus } from "./types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Tooltip from "@mui/material/Tooltip";

export interface AgentCallStatusIconProps {
  status: AgentCallStatus;
}

export const AgentCallStatusIcon = ({ status }: AgentCallStatusIconProps) => {
  return (
    <Tooltip title={status}>
      <FiberManualRecordIcon sx={{ color: colors[status], fontSize: 18 }} />
    </Tooltip>
  );
};

const colors: { [key in AgentCallStatus]: string } = {
  Available: "#43a047",
  "On Call": "#d50000",
  "Do not disturb": "#f9a825",
  Offline: "#9e9e9e",
};

export type Comm100ChatStatus = "Online" | "Away";
export interface Comm100StatusIconProps {
  status: Comm100ChatStatus;
}
export const Comm100StatusIcon = ({ status }: Comm100StatusIconProps) => {
  return (
    <Tooltip title={status}>
      <FiberManualRecordIcon
        sx={{ color: Comm100Colors[status], fontSize: 18 }}
      />
    </Tooltip>
  );
};

const Comm100Colors: { [key in Comm100ChatStatus]: string } = {
  Online: "#43a047",
  Away: "#f9a825",
};
