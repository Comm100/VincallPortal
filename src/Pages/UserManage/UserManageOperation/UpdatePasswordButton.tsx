import Button from "@mui/material/Button";
import { DrawerPage } from "../../DrawerPage";
import { UserRecord } from "../UserList";
import { updatePasswordButtonApp } from "./UpdatePasswordButtonApp";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export interface UpdatePasswordButtonProps {
  record: UserRecord;
}

export const UpdatePasswordButton = ({ record }: UpdatePasswordButtonProps) => {
  const {
    handleOpen,
    handleClose,
    handleSave,
    open,
  } = updatePasswordButtonApp({ record });
  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        Update Password
      </Button>
      <DrawerPage
        open={open}
        title="Update Password"
        onClose={handleClose}
        children={
          <UpdatePasswordForm onSubmit={handleSave} onCancel={handleClose} />
        }
      />
    </>
  );
};
