import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { DataProvider } from "src/contexts/data-context";

import { ListView } from "src/sections/dashboard/management/list/view";


// ----------------------------------------------------------------------

export default function ListPage() {
  const params = useParams();

  const { name } = params;

  return (
    <>
      <Helmet>
        <title> Management: List</title>
      </Helmet>

      <DataProvider endpoint={`${name}`}>
          <ListView name={`${name}`} />
      </DataProvider>
    </>
  );
}
