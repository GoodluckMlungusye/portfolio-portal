import Grid from "@mui/material/Unstable_Grid2";

import { _userList } from "src/_mock";

import UserNewEditForm from "../user-new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserEditView({ id }: Props) {
  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Grid>
      <UserNewEditForm currentUser={currentUser} />
    </Grid>
  );
}
