const routes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    index: "/dashboard",
    requests: {
      index: "/dashboard/operations/requests",
    },
    purchaseOrders: {
      index: "/dashboard/operations/purchase-orders",
    },
    deliveryNotes: {
      index: "/dashboard/operations/delivery-notes",
    },
    paymentOrders: {
      index: "/dashboard/operations/payment-orders",
    },
    returnSlips: {
      index: "/dashboard/operations/return-slips",
    },
    siteMovement: {
      index: "/dashboard/reports/site_movement",
    },
    procurementStatistics: {
      index: "/dashboard/reports/procurement-statistics",
    },
    paymentStatistics: {
      index: "/dashboard/reports/payment-statistics",
    },
    siteStock: {
      index: "/dashboard/reports/site-stock",
    },

    ai: {
      index: "/dashboard/ai",
    },
    tutorials: {
      index: "/dashboard/tutorials",
    },
  },

  adminTools: {
    companies: {
      index: "/admin-tools/companies",
    },
    administrators: {
      index: "/admin-tools/administrators",
    },
    costCodeLibrary: {
      index: "/admin-tools/cost-code-library",
    },
    categoriesAndItems: {
      index: "/admin-tools/categories-and-items",
    },
    branchData: {
      sites: {
        index: "/admin-tools/branch-data/sites",
      },
      users: {
        index: "/admin-tools/branch-data/users",
      },
      suppliers: {
        index: "/admin-tools/branch-data/suppliers",
      },
      subcontractors: {
        index: "/admin-tools/branch-data/subcontractors",
      },
    },
  },
  // Add missing routes
  landing: "/",
  dashboards: {
    ecommerce: "/dashboard",
  },
  ui: {
    components: {
      accordion: "/ui/components/accordion",
    },
  },
  apps: {
    chat: {
      home: "/apps/chat",
    },
    ecommerce: {
      orders: {
        show: (id: number | string) => `/apps/ecommerce/orders/${id}`,
      },
    },
  },
  externalLinks: {
    discord: "https://discord.gg/example",
    purchase: "https://example.com/purchase",
    daisyui: "https://daisyui.com",
  },
};

export default routes;
