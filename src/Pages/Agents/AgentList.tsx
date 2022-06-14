import { useMediaQuery } from "@mui/material";
import {
  SimpleList,
  List,
  Datagrid,
  TextField,
  CreateButton,
  TopToolbar,
  FunctionField,
} from "react-admin";
import { BindUserButton } from "./AgentOperation/BindUserButton";
import { DeleteAgentButton } from "./AgentOperation/DeleteAgentButton";
import { TwoOperationsField } from "../TwoOperationsField";
import { PermissionEnums, useCheckPermission } from "../../Helpers/Permission";
import { CListPagination } from "../../Components/CPagination";

export const AgentList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const canCreateAgent = useCheckPermission(PermissionEnums.canCreateAgent);
  const canDeleteAgent = useCheckPermission(PermissionEnums.canDeleteAgent);
  return (
    <List
      title="All Agents"
      actions={
        canCreateAgent ? (
          <TopToolbar>
            <CreateButton />
          </TopToolbar>
        ) : (
          <></>
        )
      }
      pagination={<CListPagination rowsPerPageOptions={[20, 35, 50]} />}
      perPage={20}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid
          size="medium"
          bulkActionButtons={
            useCheckPermission(PermissionEnums.canSelectAgent)
              ? undefined
              : false
          }
        >
          <TextField source="id" label="ID" sortable={false} />
          <TextField
            source="deviceNumber"
            label="Extension Number"
            sortable={false}
          />
          <TextField
            source="userAccount"
            label="User Account"
            sortable={false}
          />
          <TextField source="remark" label="Remark" sortable={false} />
          <TextField source="createDate" label="Create Date" sortable={false} />
          {/* // TODO: Update here; */}
          {canDeleteAgent ? (
            <FunctionField
              label="Operations"
              render={(record: any) => (
                <TwoOperationsField
                  op1={<BindUserButton record={record} />}
                  op2={<DeleteAgentButton />}
                />
              )}
            />
          ) : null}
        </Datagrid>
      )}
    </List>
  );
};
