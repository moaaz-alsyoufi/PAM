import { Suspense } from "react";
import {
  Navigate,
  Route,
  RouteProps,
  Routes,
  useLocation,
} from "react-router-dom";

import AdminLayout from "@/components/layout/admin";
import AuthLayout from "@/components/layout/auth";
import routes from "@/services/routes";
import allRoutes from "@/services/routes/all_routes";
import { useAuthContext } from "@/states/auth";

const Router = (props: RouteProps) => {
  // const useAuthContext = () => {
  //   const role = 4; // Replace with actual logic to fetch the role
  //   const isLoggedIn = () => true; // Replace with actual auth check
  //   return { isLoggedIn, getRole: () => role };
  // };
  const { isLoggedIn, restrictedRoles } = useAuthContext();
  const location = useLocation();

  // Allowed roles for limited admin tools

  // Filter Admin Tools Routes based on the role
  const getFilteredAdminRoutes = () => {
    if (restrictedRoles) {
      // Return only allowed routes for restricted roles
      return allRoutes.admin.filter(
        (route) =>
          route.name !== "admin-tools.companies.index" &&
          route.name !== "admin-tools.administrators.index" &&
          route.name !== "categoriesAndItems.index" &&
          route.name !== "admin-tools.branch-data.sites.index" &&
          route.name !== "admin-tools.branch-data.users.index" &&
          route.name !== "admin-tools.branch-data.suppliers.index"
      );
    }
    // If not restricted, return all admin routes
    return allRoutes.admin;
  };

  console.log("hello", restrictedRoles);

  return (
    <Routes>
      {/* Root Path */}
      <Route
        path="/"
        element={
          isLoggedIn() ? (
            <Navigate to={routes.dashboard.index} replace />
          ) : (
            <Navigate to={routes.auth.login} replace />
          )
        }
      />

      {/* Admin routes with AdminLayout */}
      <Route>
        {getFilteredAdminRoutes().map((route, index) => (
          <Route
            key={"admin-" + index}
            path={route.path}
            element={
              isLoggedIn() ? (
                <AdminLayout {...props}>{route.element}</AdminLayout>
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

      {/* Auth routes with AuthLayout */}
      <Route>
        {allRoutes.auth.map((route, index) => (
          <Route
            key={"auth-" + index}
            path={route.path}
            element={<AuthLayout {...props}>{route.element}</AuthLayout>}
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
