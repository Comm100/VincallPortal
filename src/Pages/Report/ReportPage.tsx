import { Box, Card, Paper, CircularProgress } from "@mui/material";
import {
  List,
  Datagrid,
  ListBase,
  TextField,
  Title,
  useListContext,
} from "react-admin";
import { CPagination } from "../../Components/CPagination";
import { ReportChart } from "./ReportChart";
import { CallTimeField } from "./CallTimeField";

export const ReportPage = () => {
  return (
    <ReportList perPage={10} debounce={-1} exporter={false}>
      <Datagrid bulkActionButtons={false} size="medium">
        <TextField source="agentId" label="Agent Id" sortable={false} />
        <TextField source="userName" label="Agent User" sortable={false} />
        <TextField
          source="incomingCall"
          label="Incoming Call"
          sortable={false}
        />
        <TextField
          source="outboundCall"
          label="Outbound Call"
          sortable={false}
        />
        <CallTimeField source="callTime" label="Call Time" sortable={false} />
      </Datagrid>
    </ReportList>
  );
};

export const ReportList = ({ children, ...others }: any) => {
  return (
    <ListBase {...others}>
      <Title title="Report" />
      <ListContainer>
        <Paper sx={{ p: 3, marginTop: 5 }}>
          <ReportChart />
          <Card sx={{ marginTop: 4 }}>{children}</Card>
        </Paper>
      </ListContainer>
    </ListBase>
  );
};

export const ListContainer = ({ children }: any) => {
  const { data, isLoading } = useListContext<ReportItemBo>();
  if (isLoading || !data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }
  return children;
};

export interface ReportItemBo {
  id: number;
  agentId: number;
  userName: string;
  incomingCall: number;
  outboundCall: number;
  callTime: number;
}
