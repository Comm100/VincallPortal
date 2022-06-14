import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      "& .MuiCircularProgress-root": {
        margin: "auto",
      },
    },
  })
);

export const CircularProgressStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
