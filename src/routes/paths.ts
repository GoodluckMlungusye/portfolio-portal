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
      edit: (id: string) => `${ROOTS.DASHBOARD}/view/${id}/edit`,
    },
    create: {
      root: `${ROOTS.DASHBOARD}/create`,
      new: `${ROOTS.DASHBOARD}/create/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/create/${id}/edit`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`
    },
  },
};
