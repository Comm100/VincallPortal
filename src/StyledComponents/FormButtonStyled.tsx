import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "../Layout/Theme/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontFamily: Typography["fontFamily"],
      paddingTop: 12,

      "& .MuiButton-root:last-child": {
        marginLeft: 12,
      },
    },
  })
);

export const FormButtonStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
