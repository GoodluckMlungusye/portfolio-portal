import { Helmet } from 'react-helmet-async';

import  JwtLoginView  from 'src/sections/auth/jwt-login-view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
