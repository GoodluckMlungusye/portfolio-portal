import { Helmet } from "react-helmet-async";

import { OverviewAppView } from "src/sections/dashboard/overview/app/view";

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      <OverviewAppView />
    </>
  );
}
