import { lazy } from "react";
import { RouteProps } from "react-router-dom";

export type RoutesProps = {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  children?: RoutesProps[];
};

// Component Wrapper
const cw = (Component: any) => {
  return <Component />;
};

const dashboardRoutes: RoutesProps[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/ai",
    name: "dashboard.ai.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/ai"))),
  },
  {
    path: "/dashboard/tutorials",
    name: "dashboard.tutorials.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/tutorials"))),
  },
  {
    path: "/dashboard/operations/requests",
    name: "dashboard.operations.requests.index",
    element: cw(
      lazy(
        () => import("@/pages/admin/dashboard/operations/requests/RequestsPage")
      )
    ),
  },

  {
    path: "/dashboard/operations/purchase-orders",
    name: "dashboard.operations.purchase-orders.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/operations/purchaseOrders"))
    ),
  },
  {
    path: "/dashboard/operations/delivery-notes",
    name: "dashboard.operations.delivery-notes.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/operations/deliveryNotes"))
    ),
  },
  {
    path: "/dashboard/operations/payment-orders",
    name: "dashboard.operations.payment-orders.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/operations/paymentOrders"))
    ),
  },

  {
    path: "/dashboard/operations/return-slips",
    name: "dashboard.operations.return-slips.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/operations/returnSlips"))
    ),
  },

  {
    path: "/dashboard/reports/site-movement",
    name: "dashboard.reports.site-movement.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/reports/siteMovement"))
    ),
  },
  {
    path: "/admin/dashboard/reports/stockOut",
    name: "dashboard.reports.stock-out.index",
    element: cw(
      lazy(
        () => import("@/pages/admin/dashboard/reports/StockOut/StockOutPage")
      )
    ),
  },

  {
    path: "/dashboard/reports/procurement-statistics",
    name: "dashboard.reports.procurement-statistics.index",
    element: cw(
      lazy(
        () => import("@/pages/admin/dashboard/reports/procurementStatistics")
      )
    ),
  },
  {
    path: "/dashboard/reports/payment-statistics",
    name: "dashboard.reports.payment-statistics.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/reports/paymentStatistics"))
    ),
  },
  {
    path: "/dashboard/reports/site-stock",
    name: "dashboard.reports.site-stock.index",
    element: cw(
      lazy(() => import("@/pages/admin/dashboard/reports/siteStock"))
    ),
  },
];

const adminToolsRoutes: RoutesProps[] = [
  {
    path: "/admin-tools/companies",
    name: "admin-tools.companies.index",
    element: cw(lazy(() => import("@/pages/admin/adminTools/companies"))),
  },
  {
    path: "/admin-tools/administrators",
    name: "admin-tools.administrators.index",
    element: cw(lazy(() => import("@/pages/admin/adminTools/administrators"))),
  },
  {
    path: "/admin-tools/cost-code-library",
    name: "cost-code-library.index",
    element: cw(lazy(() => import("@/pages/admin/adminTools/costCodeLibrary"))),
  },
  {
    path: "/admin-tools/categories-and-items",
    name: "categoriesAndItems.index",
    element: cw(
      lazy(() => import("@/pages/admin/adminTools/categoriesAndItems"))
    ),
  },

  {
    path: "/admin-tools/branch-data/sites",
    name: "admin-tools.branch-data.sites.index",
    element: cw(
      lazy(() => import("@/pages/admin/adminTools/branchData/sites"))
    ),
  },
  {
    path: "/admin-tools/branch-data/users",
    name: "admin-tools.branch-data.users.index",
    element: cw(
      lazy(() => import("@/pages/admin/adminTools/branchData/users"))
    ),
  },
  {
    path: "/admin-tools/branch-data/suppliers",
    name: "admin-tools.branch-data.suppliers.index",
    element: cw(
      lazy(() => import("@/pages/admin/adminTools/branchData/suppliers"))
    ),
  },
  {
    path: "/admin-tools/branch-data/subcontractors",
    name: "admin-tools.branch-data.subcontractors.index",
    element: cw(
      lazy(() => import("@/pages/admin/adminTools/branchData/subcontractors"))
    ),
  },
];

const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "auth.login",
    element: cw(lazy(() => import("@/pages/auth/login"))),
  },
  {
    path: "/auth/register",
    name: "auth.register",
    element: cw(lazy(() => import("@/pages/auth/register"))),
  },
  {
    path: "/auth/forgot-password",
    name: "auth.forgot-password",
    element: cw(lazy(() => import("@/pages/auth/forgot-password"))),
  },
  {
    path: "/auth/reset-password",
    name: "auth.reset-password",
    element: cw(lazy(() => import("@/pages/auth/reset-password"))),
  },
];

const otherRoutes: RoutesProps[] = [
  {
    path: "/:path",
    name: "Not Found",
    element: cw(lazy(() => import("@/pages/not-found"))),
  },
  {
    path: "/privacy-policy",
    name: "Privacy Policy",
    element: cw(lazy(() => import("@/pages/PrivacyPolicy"))),
  },
];

const allRoutes = {
  admin: [...dashboardRoutes, ...adminToolsRoutes],
  auth: authRoutes,
  other: otherRoutes,
};

export default allRoutes;
