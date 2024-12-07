import packageCheckIcon from "@iconify/icons-lucide/package-check";
import listOrderedIcon from "@iconify/icons-lucide/list-ordered";
import paperIcon from "@iconify/icons-lucide/newspaper";
import rewindIcon from "@iconify/icons-lucide/skip-back";
import airplayIcon from "@iconify/icons-lucide/airplay";
import usersIcon from "@iconify/icons-lucide/users";
import DeliveryEntityIcon from "@iconify/icons-lucide/user";
import PaymentsIcon from "@iconify/icons-lucide/dollar-sign";
import adminIcon from "@iconify/icons-lucide/user-cog";
import OperationsIcon from "@iconify/icons-lucide/settings";
import warehouseIcon from "@iconify/icons-lucide/warehouse";
import alignstart from "@iconify/icons-lucide/align-start-vertical";
import alignhorizontaljustifystart from "@iconify/icons-lucide/align-horizontal-justify-start";
import layers from "@iconify/icons-lucide/layers";
import aarrow from "@iconify/icons-lucide/arrow-up-0-1";
import compass from "@iconify/icons-lucide/compass";
import squarelibrary from "@iconify/icons-lucide/library";
import listcollapse from "@iconify/icons-lucide/list-checks";
import chartpie from "@iconify/icons-lucide/git-compare";
import compassIcon from "@iconify/icons-lucide/compass";
import layoutlist from "@iconify/icons-lucide/layout-list";
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
    icon: listOrderedIcon,
    label: "Requests",
    url: routes.dashboard.requests.index,
  },
  {
    key: "purchase-orders",
    icon: paperIcon,
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
    icon: rewindIcon,
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
    icon: alignstart,
    label: "Procurement Statistics",
    url: routes.dashboard.procurementStatistics.index,
  },
  {
    key: "payment-statistics",
    icon: alignhorizontaljustifystart,
    label: "Payment Statistics",
    url: routes.dashboard.paymentStatistics.index,
  },
  {
    key: "site-stock",
    icon: warehouseIcon,
    label: "Site Stock",
    url: routes.dashboard.siteStock.index,
  },
  {
    key: "Plus",
    label: "Plus",
    icon: OperationsIcon,
    isTitle: true,
  },
  {
    key: "ai",
    icon: aarrow,
    label: "AI",
    url: routes.dashboard.ai.index,
  },
  {
    key: "tutorials",
    icon: layers,
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
    icon: compass,
    label: "Companies",
    url: routes.adminTools.companies.index,
  },
  {
    key: "administrators",
    icon: adminIcon,
    label: "Administrators",
    url: routes.adminTools.administrators.index,
  },
  {
    key: "cost-code-library",
    icon: squarelibrary,
    label: "Cost Code Library",
    url: routes.adminTools.costCodeLibrary.index,
  },
  {
    key: "categories-and-items",
    icon: listcollapse,
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
    icon: compassIcon,
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
    icon: layoutlist,
    label: "Suppliers",
    url: routes.adminTools.branchData.suppliers.index,
  },
  {
    key: "subcontractors",
    icon: layoutlist,
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
        icon: listOrderedIcon,
        label: "Requests",
        url: routes.dashboard.requests.index,
      },
      {
        key: "purchase-orders",
        icon: paperIcon,
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
        icon: rewindIcon,
        label: "Return Slips",
        url: routes.dashboard.returnSlips.index,
      },
    ],
  },
  {
    key: "Reports",
    label: "Reports",
    icon: chartpie,
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
        icon: alignstart,
        label: "Procurement Statistics",
        url: routes.dashboard.procurementStatistics.index,
      },
      {
        key: "payment-statistics",
        icon: alignhorizontaljustifystart,
        label: "Payment Statistics",
        url: routes.dashboard.paymentStatistics.index,
      },
      {
        key: "site-stock",
        icon: warehouseIcon,
        label: "Site Stock",
        url: routes.dashboard.siteStock.index,
      },
    ],
  },
  {
    key: "ai",
    icon: aarrow,
    label: "AI",
    url: routes.dashboard.ai.index,
  },
  {
    key: "tutorials",
    icon: layers,
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
        icon: compass,
        label: "Companies",
        url: routes.adminTools.companies.index,
      },
      {
        key: "administrators",
        icon: adminIcon,
        label: "Administrators",
        url: routes.adminTools.administrators.index,
      },
      {
        key: "cost-code-library",
        icon: squarelibrary,
        label: "Cost Code Library",
        url: routes.adminTools.costCodeLibrary.index,
      },
      {
        key: "categories-and-items",
        icon: listcollapse,
        label: "Categories and Items",
        url: routes.adminTools.categoriesAndItems.index,
      },
    ],
  },
  {
    key: "branch-data",
    icon: listcollapse,
    label: "Branch Data",
    isTitle: true,
    children: [
      {
        key: "sites",
        icon: compassIcon,
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
        icon: layoutlist,
        label: "Suppliers",
        url: routes.adminTools.branchData.suppliers.index,
      },
      {
        key: "subcontractors",
        icon: layoutlist,
        label: "Subcontractors",
        url: routes.adminTools.branchData.subcontractors.index,
      },
    ],
  },
];
