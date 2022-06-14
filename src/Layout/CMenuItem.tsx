import * as React from "react";
import { ReactElement } from "react";
import { MenuItemLink } from "react-admin";

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
