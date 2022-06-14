import { MenuItemLink } from "react-admin";
import { PermissionEnums, useCheckPermission } from "../Helpers/Permission";

const menuItems = [
  { name: "agents", text: "Agents", path: "/agents" },
  { name: "callpanel", text: "Call Panel", path: "/callpanel" },
  { name: "reports", text: "Report", path: "/reports" },
  { name: "settings", text: "Settings", path: "/settings" },
  { name: "users", text: "User Manage", path: "/users" },
  { name: "connect", text: "connect", path: "/connect" },
];

export const CustomMenu = ({ onMenuClick }: any) => {
  const canManageUsers = useCheckPermission(PermissionEnums.canManageUsers);
  let menus = menuItems;
  if (!canManageUsers) {
    menus = menuItems.filter((item) => item.name !== "users");
  }
  return (
    <>
      {menus.map((item) => (
        <MenuItemLink
          key={item.name}
          to={item.path}
          primaryText={item.text}
          onClick={onMenuClick}
        />
      ))}
    </>
  );
};
