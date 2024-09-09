import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("src/pages/dashboard/overview/app"));
const ProductCreatePage = lazy(() =>
  import("src/pages/dashboard/management/new")
);
const UserListPage = lazy(() => import("src/pages/dashboard/management/list"));
const ProductEditPage = lazy(() =>
  import("src/pages/dashboard/management/edit")
);

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
        children: [{ path: "list/:index", element: <UserListPage /> }],
      },
      {
        path: "product",
        children: [
          { path: "new/:index", element: <ProductCreatePage /> },
          { path: ":id/edit", element: <ProductEditPage /> },
        ],
      },
    ],
  },
];
