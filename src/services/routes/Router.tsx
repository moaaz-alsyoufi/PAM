import { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminLayout from "@/components/layout/admin";
import AuthLayout from "@/components/layout/auth";
import routes from "@/services/routes";
import allRoutes from "@/services/routes/all_routes";
import { useAuthContext } from "@/states/auth";

const Router = () => {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  return (
    <Routes>
      {/* Redirect root "/" to the login page */}
      <Route path="/" element={<Navigate to={routes.auth.login} replace />} />

      {/* Admin routes */}
      <Route>
        {allRoutes.admin.map((route, index) => (
          <Route
            key={"admin-" + index}
            path={route.path}
            element={
              isLoggedIn() ? (
                <AdminLayout>{route.element}</AdminLayout>
              ) : (
                <Navigate
                  to={routes.auth.login + `?redirectTo=${location.pathname}`}
                  replace
                />
              )
            }
          />
        ))}
      </Route>

      {/* Auth routes */}
      <Route>
        {allRoutes.auth.map((route, index) => (
          <Route
            key={"auth-" + index}
            path={route.path}
            element={<AuthLayout>{route.element}</AuthLayout>}
          />
        ))}
      </Route>

      {/* Other routes */}
      <Route>
        {allRoutes.other.map((route, index) => (
          <Route
            key={"other-" + index}
            path={route.path}
            element={<Suspense>{route.element}</Suspense>}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
