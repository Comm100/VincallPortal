import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";
import Divider from "@mui/material/Divider";
import { useEffect, useMemo } from "react";
import { connectListApp } from "./Application/ConnectListApp";
import { ConnectListStyled } from "../../StyledComponents/ConnectListStyled";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export interface MappingData {
  id: number;
  userAccount: string;
  userName: string;
  comm100AgentId: string;
  comm100Email: string;
}
export interface ConnectListProps {
  connected: boolean;
  shouldPageRefresh: boolean;
  refresh: number;
  handleRefresh: () => void;
}

export const ConnectList = ({
  connected,
  shouldPageRefresh,
  refresh,
  handleRefresh,
}: ConnectListProps) => {
  const { isUserLoading, mapping, handleLoad } = connectListApp({});

  useEffect(() => {
    handleLoad();
  }, [refresh, shouldPageRefresh, isUserLoading]);

  const columns: GridColumns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
        hide: true,
      },
      {
        field: "userAccount",
        headerName: "User Account",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "userName",
        headerName: "User Name",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "comm100AgentId",
        headerName: "Comm100 Agent Id",
        flex: 2,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "comm100Email",
        headerName: "Comm100 Agent Email",
        flex: 2,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "operations",
        headerName: "Operations",
        width: 350,
        sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <MappingUserButton
                row={params.row}
                allData={mapping}
                onRefresh={handleRefresh}
              />
              <Divider orientation="vertical" flexItem />
              <RemoveMappingButton
                row={params.row}
                allData={mapping}
                onRefresh={handleRefresh}
              />
            </div>
          );
        },
      },
    ],
    [mapping]
  );

  return !!mapping ? (
    <ConnectListStyled>
      <DataGrid
        columns={columns}
        rows={connected && !!mapping ? (mapping as any[]) : []}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableColumnMenu
      />
    </ConnectListStyled>
  ) : (
    <>
      <Typography>User Mapping Data is loading...</Typography>
      <LinearProgress />
    </>
  );
};
