import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { CreateView } from "src/sections/dashboard/management/create";

// ----------------------------------------------------------------------

export default function CreatePage() {
  const params = useParams();

  const { index } = params;
  return (
    <>
      <Helmet>
        <title> Management: Create</title>
      </Helmet>

      <CreateView index={`${index}`} />
    </>
  );
}
