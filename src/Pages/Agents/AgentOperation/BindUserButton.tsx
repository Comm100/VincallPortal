import Button from "@mui/material/Button";
import { DrawerPage } from "../../DrawerPage";
import { bindUserButtonApp } from "./Application/BindUserButtonApp";
import { BindUserForm } from "./BindUserForm";

export interface AgentRecord {
  createDate: any;
  deviceNumber: string;
  id: number;
  remark: string;
  state: number;
  userAccount: any;
}

export interface BindUserButtonProps {
  record: AgentRecord;
}

export const BindUserButton = ({ record }: BindUserButtonProps) => {
  const { handleOpen, handleClose, handleSave, open } = bindUserButtonApp({
    record,
  });
  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        Bind User
      </Button>
      <DrawerPage
        open={open}
        title="Bind User"
        onClose={handleClose}
        children={
          <BindUserForm
            onSubmit={handleSave}
            record={record}
            onCancel={handleClose}
          />
        }
      />
    </>
  );
};
