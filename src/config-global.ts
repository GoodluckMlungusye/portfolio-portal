import { paths } from 'src/routes/paths';

export const BASE_API_URL = "http://localhost:8080";
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;
export const SECURITY_ENABLED = import.meta.env.VITE_SECURITY_ENABLED;

export const INITIAL_PATH = SECURITY_ENABLED === 'true'
  ? paths.auth.jwt.login
  : paths.dashboard.root;
