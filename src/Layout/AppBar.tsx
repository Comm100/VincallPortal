import { AppBar, Logout, UserMenu } from "react-admin";
import { Box, Typography, useMediaQuery, Theme } from "@mui/material";
import Logo from "../Assets/vincall.svg";

const CustomUserMenu = () => (
  <UserMenu>
    <Logout />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
  const isLargeEnough = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("sm")
  );
  return (
    <AppBar
      {...props}
      color="secondary"
      elevation={1}
      userMenu={<CustomUserMenu />}
    >
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        id="react-admin-title"
      />
      {isLargeEnough && (
        <Box
          src={Logo}
          component="img"
          alt="Vin Call"
          sx={{ marginRight: "1em", height: 30 }}
        />
      )}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;
