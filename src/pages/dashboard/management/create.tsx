import { Helmet } from "react-helmet-async";
import { useLocation } from 'react-router-dom';

import { useParams } from "src/routes/hooks";

import { CreateView } from "src/sections/dashboard/management/create";

// ----------------------------------------------------------------------

export default function CreatePage() {
  const params = useParams();
  const location = useLocation();
  const rowData = location.state?.rowData || {};

  const { pathName } = params;
  return (
    <>
      <Helmet>
        <title> Management: Create</title>
      </Helmet>

      <CreateView pathName={`${pathName}`} currentObject={rowData}/>
    </>
  );
}
