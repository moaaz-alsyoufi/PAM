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
      index: "/dashboard/reports/site-movement",
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

  pm: {
    siteStock: {
      index: "/dashboard/site-stock",
    },
    itemsInTransit: {
      index: "/dashboard/site-stock/items-in-transit",
    },
    inStock: {
      index: "/dashboard/site-stock/in-stock",
    },
    outStock: {
      index: "/dashboard/site-stock/out-stock",
    },
    materialBudget: {
      index: "/dashboard/material-budget",
    },
    requests: {
      index: "/dashboard/requests",
    },
    purchaseOrders: {
      index: "/dashboard/purchase-orders",
    },
    projectProgress: {
      index: "/dashboard/project-progress",
    },
    subcontractorsProgress: {
      index: "/dashboard/subcontractors-progress",
    },
    companyStandards: {
      index: "/dashboard/company-standards",
    },
    projectPlansAndDrawings: {
      index: "/dashboard/project-plans-and-drawings",
    },
    siteMovement: {
      index: "/dashboard/site-movement",
    },
    ai: {
      index: "/dashboard/ai",
    },
    tutorials: {
      index: "/dashboard/tutorials",
    },

    costCodeLibrary: {
      index: "/admin-tools/cost-code-library",
    },
    subcontractors: {
      index: "/admin-tools/subcontractors",
    },
  },

  apps: {
    chat: {
      home: "/apps/chat",
    },
  },
};

export default routes;
