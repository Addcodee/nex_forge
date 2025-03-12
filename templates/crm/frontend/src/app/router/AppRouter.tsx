import { Navigate, Route, Routes } from "react-router";
import router from "./routes";
import { JSX } from "react";
import { getCookies } from "shared/lib/cookies/cookies";
import { Tokens } from "shared/lib/types/Tokens";
import AppLayout from "app/layouts/AppLayout";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = getCookies<Tokens>("TKN") !== undefined;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route element={<Navigate to="/getting-started" />} index />
        {router.INIT_ROUTES.map(({ path, element }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Route>

      {router.AUTH_ROUTES.map(({ path, element }) => (
        <Route key={path} element={element} path={path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
