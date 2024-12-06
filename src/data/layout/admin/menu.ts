import packageIcon from "@iconify/icons-lucide/package";
import packageCheckIcon from "@iconify/icons-lucide/package-check";
import airplayIcon from "@iconify/icons-lucide/airplay";
import usersIcon from "@iconify/icons-lucide/users";
import chatIcon from "@iconify/icons-lucide/message-square";
import DeliveryEntityIcon from "@iconify/icons-lucide/user";
import PaymentsIcon from "@iconify/icons-lucide/badge-cent";
import adminIcon from "@iconify/icons-lucide/user-cog";
import OperationsIcon from "@iconify/icons-lucide/settings";
import MapIcon from "@iconify/icons-lucide/map-pinned";

import routes from "@/services/routes";
import { IMenuItem } from "@/types/layout/admin";

export const dashboardMenuItems: IMenuItem[] = [
  {
    key: "dashboard",
    icon: airplayIcon,
    label: "Dashboard",
    url: routes.dashboard.index,
  },
  {
    key: "operations",
    label: "Operations",
    icon: OperationsIcon,
    isTitle: true,
  },

  {
    key: "requests",
    icon: packageCheckIcon,
    label: "Requests",
    url: routes.dashboard.requests.index,
  },
  {
    key: "purchase-orders",
    icon: packageCheckIcon,
    label: "Purchase Orders",
    url: routes.dashboard.purchaseOrders.index,
  },
  {
    key: "delivery-notes",
    icon: packageCheckIcon,
    label: "Delivery Notes",
    url: routes.dashboard.deliveryNotes.index,
  },
  {
    key: "payment-orders",
    icon: PaymentsIcon,
    label: "Payment Orders",
    url: routes.dashboard.paymentOrders.index,
  },
  {
    key: "return-slips",
    icon: packageCheckIcon,
    label: "Return Slips",
    url: routes.dashboard.returnSlips.index,
  },

  {
    key: "Reports",
    label: "Reports",
    icon: OperationsIcon,
    isTitle: true,
  },

  {
    key: "site-movement",
    icon: packageCheckIcon,
    label: "Site Movement",
    url: routes.dashboard.siteMovement.index,
  },
  {
    key: "procurement-statistics",
    icon: packageCheckIcon,
    label: "Procurement Statistics",
    url: routes.dashboard.procurementStatistics.index,
  },
  {
    key: "payment-statistics",
    icon: packageCheckIcon,
    label: "Payment Statistics",
    url: routes.dashboard.paymentStatistics.index,
  },
  {
    key: "site-stock",
    icon: packageCheckIcon,
    label: "Site Stock",
    url: routes.dashboard.siteStock.index,
  },

  {
    key: "ai",
    icon: MapIcon,
    label: "AI",
    url: routes.dashboard.ai.index,
  },
  {
    key: "tutorials",
    icon: chatIcon,
    label: "tutorials",
    url: routes.dashboard.tutorials.index,
  },
];

export const adminToolsMenuItems: IMenuItem[] = [
  {
    key: "admin_tools",
    label: "Admin Tools",
    icon: adminIcon,
    isTitle: true,
  },
  {
    key: "companies",
    icon: packageIcon,
    label: "Companies",
    url: routes.adminTools.companies.index,
  },
  {
    key: "administrators",
    icon: usersIcon,
    label: "Administrators",
    url: routes.adminTools.administrators.index,
  },
  {
    key: "cost-code-library",
    icon: DeliveryEntityIcon,
    label: "Cost Code Library",
    url: routes.adminTools.costCodeLibrary.index,
  },
  {
    key: "categories-and-items",
    icon: DeliveryEntityIcon,
    label: "Categories and Items",
    url: routes.adminTools.categoriesAndItems.index,
  },

  {
    key: "branch-data",
    icon: DeliveryEntityIcon,
    label: "Branch Data",
    isTitle: true,
  },
  {
    key: "sites",
    icon: packageCheckIcon,
    label: "Sites",
    url: routes.adminTools.branchData.sites.index,
  },
  {
    key: "users",
    icon: usersIcon,
    label: "Users",
    url: routes.adminTools.branchData.users.index,
  },
  {
    key: "suppliers",
    icon: packageCheckIcon,
    label: "Suppliers",
    url: routes.adminTools.branchData.suppliers.index,
  },
  {
    key: "subcontractors",
    icon: packageCheckIcon,
    label: "Subcontractors",
    url: routes.adminTools.branchData.subcontractors.index,
  },
];

export const mobileDashboardMenuItems: IMenuItem[] = [
  {
    key: "dashboard",
    icon: airplayIcon,
    label: "Dashboard",
    url: routes.dashboard.index,
  },
  {
    key: "operations",
    label: "Operations",
    icon: OperationsIcon,
    isTitle: true,
    children: [
      {
        key: "requests",
        icon: packageCheckIcon,
        label: "Requests",
        url: routes.dashboard.requests.index,
      },
      {
        key: "purchase-orders",
        icon: packageCheckIcon,
        label: "Purchase Orders",
        url: routes.dashboard.purchaseOrders.index,
      },
      {
        key: "delivery-notes",
        icon: packageCheckIcon,
        label: "Delivery Notes",
        url: routes.dashboard.deliveryNotes.index,
      },
      {
        key: "payment-orders",
        icon: PaymentsIcon,
        label: "Payment Orders",
        url: routes.dashboard.paymentOrders.index,
      },
      {
        key: "return-slips",
        icon: packageCheckIcon,
        label: "Return Slips",
        url: routes.dashboard.returnSlips.index,
      },
    ],
  },
  {
    key: "Reports",
    label: "Reports",
    icon: OperationsIcon,
    isTitle: true,
    children: [
      {
        key: "site-movement",
        icon: packageCheckIcon,
        label: "Site Movement",
        url: routes.dashboard.siteMovement.index,
      },
      {
        key: "procurement-statistics",
        icon: packageCheckIcon,
        label: "Procurement Statistics",
        url: routes.dashboard.procurementStatistics.index,
      },
      {
        key: "payment-statistics",
        icon: packageCheckIcon,
        label: "Payment Statistics",
        url: routes.dashboard.paymentStatistics.index,
      },
      {
        key: "site-stock",
        icon: packageCheckIcon,
        label: "Site Stock",
        url: routes.dashboard.siteStock.index,
      },
    ],
  },
  {
    key: "ai",
    icon: MapIcon,
    label: "AI",
    url: routes.dashboard.ai.index,
  },
  {
    key: "tutorials",
    icon: chatIcon,
    label: "tutorials",
    url: routes.dashboard.tutorials.index,
  },
];

export const mobileAdminToolsMenuItems: IMenuItem[] = [
  {
    key: "admin_tools",
    label: "Admin Tools",
    icon: adminIcon,
    isTitle: true,
    children: [
      {
        key: "companies",
        icon: packageIcon,
        label: "Companies",
        url: routes.adminTools.companies.index,
      },
      {
        key: "administrators",
        icon: usersIcon,
        label: "Administrators",
        url: routes.adminTools.administrators.index,
      },
      {
        key: "cost-code-library",
        icon: DeliveryEntityIcon,
        label: "Cost Code Library",
        url: routes.adminTools.costCodeLibrary.index,
      },
      {
        key: "categories-and-items",
        icon: DeliveryEntityIcon,
        label: "Categories and Items",
        url: routes.adminTools.categoriesAndItems.index,
      },
    ],
  },
  {
    key: "branch-data",
    icon: DeliveryEntityIcon,
    label: "Branch Data",
    isTitle: true,
    children: [
      {
        key: "sites",
        icon: packageCheckIcon,
        label: "Sites",
        url: routes.adminTools.branchData.sites.index,
      },
      {
        key: "users",
        icon: packageCheckIcon,
        label: "Users",
        url: routes.adminTools.branchData.users.index,
      },
      {
        key: "suppliers",
        icon: packageCheckIcon,
        label: "Suppliers",
        url: routes.adminTools.branchData.suppliers.index,
      },
      {
        key: "subcontractors",
        icon: packageCheckIcon,
        label: "Subcontractors",
        url: routes.adminTools.branchData.subcontractors.index,
      },
    ],
  },
];
