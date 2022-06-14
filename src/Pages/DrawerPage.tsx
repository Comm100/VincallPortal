import Button from "@mui/material/Button";
import { ReactNode } from "react";
import { Drawer } from "@mui/material";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DrawerPageProps {
  open: boolean;
  anchor?: "left" | "right" | "bottom" | "top";
  title: string;
  onClose: () => void;
  children: ReactNode;
}
export const DrawerPage = ({
  open,
  anchor = "right",
  title,
  onClose,
  children,
}: DrawerPageProps) => {
  return (
    <Drawer open={open} anchor={anchor} title={title} onClose={onClose}>
      <Box style={{ padding: 24, paddingTop: 16 }}>
        <Button variant="text" onClick={onClose} startIcon={<CloseIcon />}>
          Close
        </Button>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Drawer>
  );
};
