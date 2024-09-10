import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("src/pages/dashboard/overview/app"));
const CreatePage = lazy(() => import("src/pages/dashboard/management/create"));
const ListPage = lazy(() => import("src/pages/dashboard/management/list"));
const EditPage = lazy(() => import("src/pages/dashboard/management/edit"));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: "user",
        children: [{ path: "list/:index", element: <ListPage /> }],
      },
      {
        path: "product",
        children: [
          { path: "new/:index", element: <CreatePage /> },
          { path: ":id/edit", element: <EditPage /> },
        ],
      },
    ],
  },
];
