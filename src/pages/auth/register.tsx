import { Helmet } from 'react-helmet-async';

import JwtRegisterView from 'src/sections/auth/jwt-register-view';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Register</title>
      </Helmet>

      <JwtRegisterView />
    </>
  );
}
