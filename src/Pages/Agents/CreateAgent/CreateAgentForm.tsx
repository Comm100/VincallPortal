import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import Button from "@mui/material/Button";
import { FormItemStyled } from "../../../StyledComponents/FormItemStyled";
import Typography from "@mui/material/Typography";
import { createAgentFormApp } from "./CreateAgentFormApp";
import {
  useCheckPermission,
  PermissionEnums,
} from "../../../Helpers/Permission";

export const CreateAgentForm = (props: any) => {
  const canCreateAgent = useCheckPermission(PermissionEnums.canCreateAgent);
  const { handleClick } = createAgentFormApp({});

  if (!canCreateAgent) {
    return null;
  }

  return (
    <Create {...props}>
      <SimpleForm
        toolbar={
          <Toolbar>
            <SaveButton icon={<></>} />
            <div style={{ marginLeft: 12 }}>
              <Button variant="outlined" onClick={handleClick}>
                Cancel
              </Button>
            </div>
          </Toolbar>
        }
      >
        <FormItemStyled>
          <Typography variant="subtitle1" gutterBottom component="div">
            {`Extension Number: `}
          </Typography>
          <TextInput source="deviceNumber" variant="outlined" required />
        </FormItemStyled>
        <FormItemStyled>
          <Typography variant="subtitle1" gutterBottom component="div">
            {`Remark: `}
          </Typography>
          <TextInput multiline source="Remark" variant="outlined" required />
        </FormItemStyled>
      </SimpleForm>
    </Create>
  );
};
