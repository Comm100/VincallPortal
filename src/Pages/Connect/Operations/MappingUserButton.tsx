import Button from "@mui/material/Button";
import { DrawerPage } from "../../DrawerPage";
import { mappingUserButtonApp } from "../Application/MappingUserButtonApp";
import { MappingUserForm } from "./MappingUserForm";

export interface MappingUserButtonProps {
  row: any;
  allData: any;
  onRefresh: () => void;
}

export const MappingUserButton = ({
  row,
  allData,
  onRefresh,
}: MappingUserButtonProps) => {
  const { handleOpen, handleClose, handleSave, open } = mappingUserButtonApp({
    row,
    allData,
    onRefresh,
  });
  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        Mapping User
      </Button>
      <DrawerPage
        open={open}
        title="Mapping User"
        onClose={handleClose}
        children={
          <MappingUserForm
            onSubmit={handleSave}
            row={row}
            onCancel={handleClose}
          />
        }
      />
    </>
  );
};
