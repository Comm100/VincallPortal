import { useState } from "react";
import { useNotify } from "react-admin";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";

export interface MappingUserButtonAppProps {
  row: any;
  allData: any;
  onRefresh: () => void;
}

export interface MappingUserButtonApp {
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: (values: any) => void;
  open: boolean;
}

export const mappingUserButtonApp = ({
  row,
  allData,
  onRefresh,
}: MappingUserButtonAppProps): MappingUserButtonApp => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const notify = useNotify();
  const handleSave = (values: any) => {
    const unchangedData = allData
      .filter((data: { id: any; comm100AgentId: string }) => {
        return data.id !== row.id && data.comm100AgentId !== "";
      })
      .map((data: any) => ({
        comm100AgentId: data.comm100AgentId,
        userAccount: data.userAccount,
        comm100Email: data.comm100Email,
        userName: data.userName,
      }));

    const changedData = {
      comm100AgentId: values.comm100Agent.value,
      userAccount: row.userAccount,
      comm100Email: values.comm100Agent.label,
      userName: row.userName,
    };
    const newData = [...unchangedData, changedData];

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
        notify("Map user successfully!", {
          type: "success",
        });
      })
      .catch(() => {
        notify("Failed to map user!", {
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
