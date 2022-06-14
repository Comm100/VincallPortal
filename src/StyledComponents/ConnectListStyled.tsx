import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "../Layout/Theme/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 635,
      width: "100%",

      "& [class*=MuiDataGrid-columnSeparator]": {
        display: "none !important",
      },

      "& [class*=MuiDataGrid-columnHeaderTitle]": {
        fontWeight: 700,
      },

      "& [class*=Mui-selected]": {
        backgroundColor: "inherit !important",
      },

      "& [class*=MuiDataGrid-row]:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04) !important",
      },
    },
  })
);

export const ConnectListStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
