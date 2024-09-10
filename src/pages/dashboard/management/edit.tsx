import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { EditView } from "src/sections/dashboard/management/edit";

// ----------------------------------------------------------------------

export default function EditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit</title>
      </Helmet>

      <EditView id={`${id}`} />
    </>
  );
}
