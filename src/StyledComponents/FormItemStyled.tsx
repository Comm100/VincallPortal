import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "baseline",
      width: "70%",

      "& .MuiTypography-root": {
        minWidth: 150,
        width: "12%",
      },

      "& .MuiFormControl-root": {
        minWidth: 300,
        width: "58%",
      },

      "& span": {
        display: "none",
      },
    },
  })
);

export const FormItemStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
