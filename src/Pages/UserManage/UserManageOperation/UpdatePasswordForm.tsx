import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormErrorMessageStyled } from "../../../StyledComponents/FormErrorMessageStyled";
import { FormButtonStyled } from "../../../StyledComponents/FormButtonStyled";
import { UpdatePasswordValue } from "./UpdatePasswordButtonApp";

export interface BindUserFormProps {
  onSubmit: (values: UpdatePasswordValue) => void;
  onCancel: () => void;
}

const validateSchema = Yup.object().shape({
  password: Yup.string().required("Password cannot be empty."),
});

export const UpdatePasswordForm = ({
  onSubmit,
  onCancel,
}: BindUserFormProps) => {
  return (
    <Formik
      initialValues={{
        password: "",
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validateSchema}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form>
            <TextField
              id="password"
              label="Password"
              sx={{ width: 300 }}
              onChange={(event) =>
                setFieldValue("password", event.target.value || "")
              }
              error={!!errors.password}
              variant="outlined"
            />
            {errors.password ? (
              <FormErrorMessageStyled>{`${errors.password}`}</FormErrorMessageStyled>
            ) : null}
            <FormButtonStyled>
              <Button type="submit" variant="contained">
                Save
              </Button>
              <Button onClick={onCancel} variant="outlined">
                Cancel
              </Button>
            </FormButtonStyled>
          </Form>
        );
      }}
    </Formik>
  );
};
