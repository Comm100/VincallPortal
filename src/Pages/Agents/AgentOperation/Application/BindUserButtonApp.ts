import { useState } from "react";
import { useNotify, useUpdate } from "react-admin";
import { AgentRecord } from "../BindUserButton";

export interface BindUserButtonAppProps {
  record: AgentRecord;
}

export interface BindUserButtonApp {
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: (values: { userAccount: string }) => void;
  open: boolean;
}

export const bindUserButtonApp = ({
  record,
}: BindUserButtonAppProps): BindUserButtonApp => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [update] = useUpdate();
  const notify = useNotify();

  const handleClose = () => setOpen(false);
  const handleSave = (values: { userAccount: string }) => {
    update("agents", {
      id: record.id,
      data: { ...record, userAccount: values.userAccount },
    })
      .then(() => {
        setOpen(false);
        notify("Bind user successfully!", {
          type: "success",
        });
      })
      .catch(() => {
        notify("Failed to bind user!", {
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
