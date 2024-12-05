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
    path: "/dashboard/products",
    name: "dashboard.products.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/orders",
    name: "dashboard.orders.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },

  {
    path: "/dashboard/users",
    name: "dashboard.users.index",
    element: cw(lazy(() => import("@/pages/admin/users"))),
  },
  {
    path: "/dashboard/delivery-entities",
    name: "deliveryEntity.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/chat",
    name: "chats.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },

  {
    path: "/dashboard/payments",
    name: "payments.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/delivery",
    name: "delivery.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/map",
    name: "map.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
];

const adminToolsRoutes: RoutesProps[] = [
  {
    path: "/dashboard/products",
    name: "dashboard.products.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/orders",
    name: "dashboard.orders.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },

  {
    path: "/admin-tools/branch-data/users",
    name: "admin-tools.branch-data.users.index",
    element: cw(lazy(() => import("@/pages/admin/users"))),
  },
  {
    path: "/dashboard/delivery-entities",
    name: "deliveryEntity.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/chat",
    name: "chats.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },

  {
    path: "/dashboard/payments",
    name: "payments.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/delivery",
    name: "delivery.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
  },
  {
    path: "/dashboard/map",
    name: "map.index",
    element: cw(lazy(() => import("@/pages/admin/dashboard/dashboards"))),
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
