import { paths } from 'src/routes/paths';

export const BASE_API_URL = "http://localhost:8080";
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

export const INITIAL_PATH = import.meta.env.VITE_SECURITY_ENABLED === 'true'
  ? paths.auth.jwt.login
  : paths.dashboard.root;
