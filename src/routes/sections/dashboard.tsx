import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// import { AuthGuard } from 'src/auth/guard';

import DashboardLayout from "src/layouts/dashboard";
import { RowProvider } from "src/contexts/row-context";

import { LoadingScreen } from "src/components/loading-screen";

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("src/pages/dashboard/overview/app"));
const CreatePage = lazy(() => import("src/pages/dashboard/management/create"));
const ListPage = lazy(() => import("src/pages/dashboard/management/list"));

// USER
const UserProfilePage = lazy(() => import("src/pages/user/profile"));
const UserCardsPage = lazy(() => import("src/pages/user/cards"));
const UserCreatePage = lazy(() => import("src/pages/user/new"));
const UserEditPage = lazy(() => import("src/pages/user/edit"));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <RowProvider>
            <Outlet />
          </RowProvider>
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: "view",
        children: [{ path: "list/:pathName", element: <ListPage /> }],
      },
      {
        path: "create",
        children: [
          { path: "new/:pathName", element: <CreatePage /> },
        ],
      },
      {
        path: "user",
        children: [
          { element: <UserProfilePage />, index: true },
          { path: "profile", element: <UserProfilePage /> },
          { path: "cards", element: <UserCardsPage /> },
          { path: "new", element: <UserCreatePage /> },
          { path: ":id/edit", element: <UserEditPage /> },
        ],
      },
    ],
  },
];
