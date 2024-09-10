import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { UserListView } from "src/sections/dashboard/management/list/view";

// ----------------------------------------------------------------------

export default function UserListPage() {
  const params = useParams();

  const { index } = params;
  return (
    <>
      <Helmet>
        <title> Management: List</title>
      </Helmet>

      <UserListView index={`${index}`} />
    </>
  );
}
