import { useState } from "react";
import { useDataProvider, useNotify } from "react-admin";
import { UserRecord } from "../UserList";

export interface UpdatePasswordValue {
  password: string;
}
export interface UpdatePasswordButtonAppProps {
  record: UserRecord;
}

export interface UpdatePasswordButtonApp {
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: (values: UpdatePasswordValue) => void;
  open: boolean;
}

export const updatePasswordButtonApp = ({
  record,
}: UpdatePasswordButtonAppProps): UpdatePasswordButtonApp => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleClose = () => setOpen(false);
  const handleSave = async (values: UpdatePasswordValue) => {
    await dataProvider
      .updatePassword("user", {
        id: record.id,
        data: { password: values.password },
      })
      .then(() => {
        setOpen(false);
        notify("Update password successfully!", {
          type: "success",
        });
      })
      .catch(() => {
        notify("Failed to update password!", {
          type: "warning",
        });
      });
  };

  return {
    handleOpen,
    handleClose,
    handleSave,
    open,
  };
};
