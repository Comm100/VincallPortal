import Button from "@mui/material/Button";
import { removeMappingButtonApp } from "../Application/RemoveMappingButtonApp";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export interface RemoveMappingButtonProps {
  row: any;
  allData: any;
  onRefresh: () => void;
}

export const RemoveMappingButton = ({
  row,
  allData,
  onRefresh,
}: RemoveMappingButtonProps) => {
  const {
    handleRemove,
    handleOpen,
    open,
    handleClose,
  } = removeMappingButtonApp({
    row,
    allData,
    onRefresh,
  });
  return (
    <>
      <Button onClick={handleOpen} color="error">
        Remove Mapping
      </Button>
      <Dialog open={open}>
        <DialogTitle>{"Confirm Dialog"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user mapping data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemove}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
