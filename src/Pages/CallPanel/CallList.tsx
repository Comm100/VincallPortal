import {
  Datagrid,
  FunctionField,
  List,
  TextField,
  useRecordContext,
} from "react-admin";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { CListPagination } from "../../Components/CPagination";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { CallTimeField } from "../Report/CallTimeField";
import CallIcon from "@mui/icons-material/Call";
import { format } from "date-fns";
import { toLocalTime } from "../../Helpers/Index";

export interface CallListProps {
  onClick: any;
  disabled?: boolean;
}

export const CallList = ({ onClick, disabled }: CallListProps) => {
  const handleClick = (record: any) => {
    onClick && onClick(getToNumber(record));
  };

  return (
    <List
      title=" "
      resource="calllistsForToday"
      actions={<></>}
      empty={
        <Box sx={{ textAlign: "center", p: 4, width: "100%" }}>
          <Typography>No call record.</Typography>
        </Box>
      }
      pagination={<CListPagination rowsPerPageOptions={[10, 20, 35]} />}
      perPage={10}
      queryOptions={{
        enabled: true,
        refetchInterval: 30 * 1000,
        refetchOnMount: true,
      }}
    >
      <Datagrid size="medium" bulkActionButtons={false}>
        <CallNumberField
          source="extensionNumber"
          label="Number"
          sortable={false}
        />
        <CallTimeField source="callTime" label="Duration" sortable={false} />
        <TimeField source="createDate" label="Time" sortable={false} />
        <FunctionField
          label="Operations"
          render={(record: any) => (
            <CallOperation
              onClick={() => {
                handleClick(record);
              }}
              disabled={disabled}
            />
          )}
        />
      </Datagrid>
    </List>
  );
};

const CallNumberField = ({}: any) => {
  const record = useRecordContext();
  const isIncomingCall = isCurrentNumber(record.to);
  return isIncomingCall ? (
    <Box component="span" sx={style}>
      <CallReceivedIcon /> {record.from}
    </Box>
  ) : (
    <Box component="span" sx={style}>
      <CallMadeIcon /> {record.to}
    </Box>
  );
};

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

interface CallOperationProps {
  onClick: any;
  disabled?: boolean;
}

const CallOperation = ({ disabled, onClick }: CallOperationProps) => {
  return (
    <Tooltip title="Call to">
      <IconButton color="primary" disabled={disabled} onClick={onClick}>
        <CallIcon />
      </IconButton>
    </Tooltip>
  );
};

const getToNumber = (record: any) => {
  const isIncomingCall = isCurrentNumber(record.to);
  return isIncomingCall ? record.from : record.to;
};

const TimeField = ({ source }: any) => {
  const record = useRecordContext();
  return <span>{format(toLocalTime(record[source]), "yyyy-MM-dd HH:mm")}</span>;
};

export const getCurrentNumber = () => "17058053314";
export const isCurrentNumber = (value: string) => {
  return String(value).indexOf("17058053314") !== -1;
};
