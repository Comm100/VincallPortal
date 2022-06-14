import Box from "@mui/material/Box";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ContactsIcon from "@mui/icons-material/Contacts";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import { MenuProps, useSidebarState, useStore } from "react-admin";
import { CMenuItem } from "./CMenuItem";
import { useCheckPermission, PermissionEnums } from "../Helpers/Permission";
import { useState } from "react";
import { Comm100Icon } from "../Assets/Comm100Icon";

const menuItems = [
  { name: "agents", text: "Agents", path: "/agents", icon: <PeopleAltIcon /> },
  {
    name: "callpanel",
    text: "Call Panel",
    path: "/callpanel",
    icon: <AddIcCallIcon />,
  },
  {
    name: "reports",
    text: "Report",
    path: "/reports",
    icon: <InsertChartIcon />,
  },
  {
    name: "settings",
    text: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
  {
    name: "users",
    text: "User Manage",
    path: "/users",
    icon: <PersonOutlineIcon />,
  },
  {
    name: "connect",
    text: "Connect Comm100",
    path: "/connect",
    icon: <Comm100Icon sx={{ fontSize: "24px !important" }} />,
  },
];
const Menu = ({ dense = false }: MenuProps) => {
  const [open] = useSidebarState();
  const [menuState, setMenuState] = useState<{ comm100: boolean }>({
    comm100: true,
  });
  const canManageUsers = useCheckPermission(PermissionEnums.canManageUsers);
  const handleToggle = () => {
    setMenuState({ comm100: !menuState.comm100 });
  };
  const [isComm100Connect] = useStore<boolean>("isComm100Connect", false);
  let menus = menuItems;
  if (!canManageUsers) {
    menus = menuItems.filter((item) => item.name !== "users");
  }
  return (
    <Box
      sx={{
        width: open ? 220 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      {menus.map((m) => {
        return (
          <CMenuItem to={m.path} key={m.name} icon={m.icon} label={m.text} />
        );
      })}

      {isComm100Connect ? (
        <div style={{ paddingLeft: open ? 28 : 0 }}>
          <CMenuItem
            to="/installcode"
            label="Install Code"
            icon={<DisplaySettingsIcon sx={{ fontSize: "24px !important" }} />}
          />
          <CMenuItem
            to="/chatvolume"
            label="Chat Volume"
            icon={<ContactsIcon sx={{ fontSize: "24px !important" }} />}
          />
        </div>
      ) : null}
    </Box>
  );
};

export default Menu;
