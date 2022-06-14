import { useState } from "react";
import { useNotify } from "react-admin";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";

export interface RemoveMappingButtonAppProps {
  row: any;
  allData: any;
  onRefresh: () => void;
}

export interface RemoveMappingButtonApp {
  handleRemove: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export const removeMappingButtonApp = ({
  row,
  allData,
  onRefresh,
}: RemoveMappingButtonAppProps): RemoveMappingButtonApp => {
  const [open, setOpen] = useState<boolean>(false);
  const notify = useNotify();
  const handleRemove = () => {
    const newData = allData
      .filter((data: { id: any; comm100AgentId: string }) => {
        return data.id !== row.id && data.comm100AgentId !== "";
      })
      .map((data: any) => ({
        comm100AgentId: data.comm100AgentId,
        userAccount: data.userAccount,
        comm100Email: data.comm100Email,
        userName: data.userName,
      }));
    customHttpClient(
      `${getServerURL()}/usermapping/${localStorage.getItem("connectSiteId")}`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
      }
    )
      .then(() => {
        setOpen(false);
        onRefresh();
        notify("Remove mapping successfully!", {
          type: "success",
        });
      })
      .catch(() => {
        notify("Failed to remove mapping!", {
          type: "warning",
        });
      });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    handleRemove,
    handleOpen,
    handleClose,
    open,
  };
};
