const routes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    index: "/dashboard",
    orders: {
      index: "/dashboard/orders",
      show: (id: number | string) => `/dashboard/orders/${id}`,
    },
    products: {
      index: "/dashboard/products",
    },
    users: {
      index: "/dashboard/users",
    },
    chat: {
      index: "/dashboard/chat",
      send: (id: number | string) => `/dashboard/chat?receiverId=${id}`,
    },
    payments: {
      index: "/dashboard/payments",
    },
    delivery: {
      index: "/dashboard/delivery",
    },
    deliveryEntity: {
      index: "/dashboard/delivery-entities",
    },
    map: {
      index: "/dashboard/map",
    },
  },
};

export default routes;

export const flatRoutes = [
  routes.dashboard.index,
  routes.dashboard.orders.index,
  routes.dashboard.chat.index,
];

export const adminRoutes = [
  routes.dashboard.index,
  routes.dashboard.products.index,
  routes.dashboard.users.index,
  routes.dashboard.deliveryEntity.index,
  routes.dashboard.orders.index,
  routes.dashboard.delivery.index,
  routes.dashboard.payments.index,
  routes.dashboard.map.index,
  routes.dashboard.chat.index,
];
