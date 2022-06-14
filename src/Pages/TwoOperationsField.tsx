import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import PropTypes from "prop-types";

export interface TwoOperationsFieldProps {
  op1: ReactNode;
  op2: ReactNode;
}
export const TwoOperationsField = ({ op1, op2 }: TwoOperationsFieldProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      {op1}
      <Divider orientation="vertical" flexItem />
      {op2}
    </Box>
  );
};

TwoOperationsField.propTypes = {
  addLabel: PropTypes.bool,
  label: PropTypes.string,
  op1: PropTypes.element,
  op2: PropTypes.element,
};

TwoOperationsField.defaultProps = {
  addLabel: true,
};
