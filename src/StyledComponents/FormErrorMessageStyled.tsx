import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "../Layout/Theme/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontFamily: Typography["fontFamily"],
      paddingLeft: 6,
      color: "#d32f2f",
    },
  })
);

export const FormErrorMessageStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
