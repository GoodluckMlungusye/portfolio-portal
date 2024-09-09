import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { ProductCreateView } from "src/sections/product/view";

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  const params = useParams();

  const { index } = params;
  return (
    <>
      <Helmet>
        <title> Management: Create</title>
      </Helmet>

      <ProductCreateView index={`${index}`} />
    </>
  );
}
