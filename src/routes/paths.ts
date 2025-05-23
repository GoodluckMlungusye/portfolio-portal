// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    view: {
      root: `${ROOTS.DASHBOARD}/view`,
      list: `${ROOTS.DASHBOARD}/view/list`,
    },
    create: {
      root: `${ROOTS.DASHBOARD}/create`,
      new: `${ROOTS.DASHBOARD}/create/new`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`
    },
  },
};
