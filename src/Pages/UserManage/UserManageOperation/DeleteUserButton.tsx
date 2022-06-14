import { DeleteWithConfirmButton } from "react-admin";

export const DeleteUserButton = () => {
  return (
    <DeleteWithConfirmButton
      label="Delete"
      confirmTitle="Confirm Delete"
      confirmContent="Are you sure to delete?"
      icon={<></>}
    />
  );
};
