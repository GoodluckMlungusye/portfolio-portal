import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { ListView } from "src/sections/dashboard/management/list/view";

// ----------------------------------------------------------------------

export default function ListPage() {
  const params = useParams();

  const { index } = params;
  return (
    <>
      <Helmet>
        <title> Management: List</title>
      </Helmet>

      <ListView index={`${index}`} />
    </>
  );
}
