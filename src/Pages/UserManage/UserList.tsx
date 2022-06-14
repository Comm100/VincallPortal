import { useMediaQuery } from "@mui/material";
import {
  SimpleList,
  List,
  Datagrid,
  TextField,
  TopToolbar,
  FunctionField,
} from "react-admin";
import { CListPagination } from "../../Components/CPagination";
import { TwoOperationsField } from "../TwoOperationsField";
import { DeleteUserButton } from "./UserManageOperation/DeleteUserButton";
import { UpdatePasswordButton } from "./UserManageOperation/UpdatePasswordButton";

export interface UserRecord {
  account: string;
  createDate: string;
  id: number;
  isAdmin: boolean;
  remark: string | null;
  userName: string;
}

export const UserList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <List
      title="All Users"
      actions={<TopToolbar />}
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
        <Datagrid>
          <TextField source="id" label="ID" sortable={false} />
          <TextField source="account" label="Account" sortable={false} />
          <TextField source="userName" label="User Name" sortable={false} />
          <TextField source="remark" label="Remark" sortable={false} />
          <TextField source="createDate" label="Create Date" sortable={false} />
          <FunctionField
            label="Operations"
            render={(record: UserRecord) => (
              <TwoOperationsField
                label="Operations"
                op1={<UpdatePasswordButton record={record} />}
                op2={<DeleteUserButton />}
              />
            )}
          />
        </Datagrid>
      )}
    </List>
  );
};
