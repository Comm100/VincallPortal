import { useSidebarState } from "react-admin";
import {
  List,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ReactElement, ReactNode } from "react";

export interface CSubMenuProps {
  label: string;
  isOpen: boolean;
  dense?: boolean;
  icon: ReactElement;
  children: ReactNode;
  onToggle: () => void;
}

export const CSubMenu = ({
  label,
  isOpen,
  dense = true,
  icon,
  children,
  onToggle,
}: CSubMenuProps) => {
  const [isSidebarOpen] = useSidebarState();
  const Header = (
    <MenuItem dense={dense} onClick={onToggle} sx={{ paddingLeft: "19px" }}>
      <ListItemIcon
        sx={{ minWidth: 5, "& svg.MuiSvgIcon-root": { fontSize: "24px " } }}
      >
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {label}
      </Typography>
    </MenuItem>
  );
  return (
    <div>
      {isSidebarOpen || isOpen ? (
        Header
      ) : (
        <Tooltip title={label} placement="right">
          {Header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          sx={{
            "& a": {
              transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              paddingLeft: isSidebarOpen ? 4 : 2,
            },
          }}
        >
          {children}
        </List>
      </Collapse>
    </div>
  );
};
