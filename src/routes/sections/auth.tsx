import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/register'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
          <AuthClassicLayout title="Manage the job more effectively with Minimal">
            <JwtRegisterPage />
          </AuthClassicLayout>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt],
  },
];
