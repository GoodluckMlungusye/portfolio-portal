import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { DataProvider } from "src/contexts/data-context";

import { ListView } from "src/sections/dashboard/management/list/view";


// ----------------------------------------------------------------------

export default function ListPage() {
  const params = useParams();

  const { pathName } = params;

  return (
    <>
      <Helmet>
        <title> Management: List</title>
      </Helmet>

      <DataProvider endpoint={`${pathName}`}>
          <ListView pathName={`${pathName}`} />
      </DataProvider>
    </>
  );
}
