import { Box, TextField, MenuItem, CircularProgress } from "@mui/material";
import { CallScreen } from "../../Components/CallScreen";
import { DeviceState } from "./types";
import { DeviceManager } from "./DeviceManager";
import { useCheckPermission, PermissionEnums } from "../../Helpers/Permission";
import { CallList } from "./CallList";

export interface CallTabContentProps {
  isAgentLoading: boolean;
  currentAgentId: string;
  agentList: any[];
  deviceState: DeviceState;
  deviceManager?: DeviceManager;
  currentAgentObject: any;
  disabled?: boolean;
  handleCurrentAgentChange: (p: any) => any;
  onCallClick: any;
}
export const CallTabContent = ({
  isAgentLoading,
  currentAgentId,
  currentAgentObject,
  agentList,
  deviceState,
  deviceManager,
  disabled,
  handleCurrentAgentChange,
  onCallClick,
}: CallTabContentProps) => {
  const canSelectAgentWhenCall = useCheckPermission(
    PermissionEnums.canSelectAgentWhenCall
  );
  const canCall =
    deviceState.status === "ready" || deviceState.status === "end";
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box sx={{ minWidth: "306px" }}>
        <Box>
          <TextField
            label="Current Agent (+17058053314)"
            select
            value={currentAgentId}
            placeholder="Select an Agent"
            onChange={handleCurrentAgentChange}
            style={{ width: 200 }}
            variant="standard"
            disabled
            // disabled={!canSelectAgentWhenCall || disabled}
          >
            {isAgentLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              agentList.map(({ id, deviceNumber, userAccount }: any) => (
                <MenuItem key={id} value={id}>
                  {userAccount} {deviceNumber}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>
        {deviceState.status === "initializing" ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ pt: 2 }}>
            <CallScreen
              currentAgent={currentAgentId}
              currentAgentNumber={currentAgentObject.deviceNumber}
              deviceManager={deviceManager!}
              deviceState={deviceState}
              disabled={disabled}
            />
          </Box>
        )}
      </Box>
      <Box sx={{ flex: 1, marginLeft: 3, marginTop: 1 }}>
        <CallList disabled={!canCall || disabled} onClick={onCallClick} />
      </Box>
    </Box>
  );
};
