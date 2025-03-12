import LoginPage from "auth/pages";
import ClientsPage from "clients/pages";
import ModulePage from "module/pages";

interface IRoute {
  path: string;
  element: React.ReactNode;
}

interface IRoutes extends IRoute {
  children?: IRoute[];
}

const INIT_ROUTES: IRoutes[] = [
  { path: "/clients", element: <ClientsPage /> },
  { path: "/module", element: <ModulePage /> },
];

const AUTH_ROUTES: IRoutes[] = [{ path: "/login", element: <LoginPage /> }];

export default { INIT_ROUTES, AUTH_ROUTES };
