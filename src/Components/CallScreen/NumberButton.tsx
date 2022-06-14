import Button, { ButtonProps } from "@mui/material/Button";

export interface NumberButtonProps
  extends Pick<ButtonProps, "variant" | "color" | "disabled"> {
  onClick: (character?: number | string) => void;
  character?: number | string;
  children: any;
  active?: boolean;
}

export const NumberButton = ({
  character,
  children,
  active,
  onClick,
  ...others
}: NumberButtonProps) => {
  return (
    <Button
      sx={NumberButtonStyle}
      onClick={() => {
        onClick(character);
      }}
      variant={active ? "contained" : "outlined"}
      {...others}
    >
      {children}
    </Button>
  );
};

const NumberButtonStyle = {
  width: 56,
  height: 56,
  minWidth: 56,
  borderRadius: "100%",
  padding: 0,
  "&:focus": {
    "&:after": {
      backgroundColor: "transparent",
    },
  },
};
