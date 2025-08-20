import LoginPage from "auth/pages";
import ModulePage from "module/pages";
import ModulePageV2 from "module-v2/pages";
import GettingStartedPage from "gettingStarted/pages";
import {
  ModuleCreatePage,
  ModuleEditPage,
  ModuleListPage,
} from "module_page/pages";

interface IRoute {
  path: string;
  element: React.ReactNode;
}

interface IRoutes extends IRoute {
  children?: IRoute[];
}

const INIT_ROUTES: IRoutes[] = [
  { path: "/module", element: <ModulePage /> },
  { path: "/module-v2", element: <ModulePageV2 /> },
  { path: "/getting-started", element: <GettingStartedPage /> },
  {
    path: "/module/list",
    element: <ModuleListPage />,
  },
  {
    path: "/module/create",
    element: <ModuleCreatePage />,
  },
  {
    path: "/module/edit/:id",
    element: <ModuleEditPage />,
  },
];

const AUTH_ROUTES: IRoutes[] = [{ path: "/login", element: <LoginPage /> }];

export default { INIT_ROUTES, AUTH_ROUTES };
