import * as React from "react";
import { ReactElement, ReactNode } from "react";
import {
  List,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslate, useSidebarState, MenuItemLink } from "react-admin";

interface Props {
  to: string;
  onClick?: any;
  icon: ReactElement;
  label: string;
}

export const CMenuItem = ({ to, onClick, icon, label }: Props) => {
  return (
    <MenuItemLink
      to={to}
      onClick={onClick}
      leftIcon={icon}
      primaryText={label}
      dense={false}
    />
  );
};
