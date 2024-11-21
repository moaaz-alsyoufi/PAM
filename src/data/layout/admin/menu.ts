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

export const adminMenuItems: IMenuItem[] = [
  {
    key: "dashboard",
    icon: airplayIcon,
    label: "Dashboard",
    url: routes.dashboard.index,
  },
  {
    key: "admin_tools",
    label: "Admin Tools",
    icon: adminIcon,
    notAdmin: true,
    children: [
      {
        key: "companies",
        icon: packageIcon,
        label: "Companies",
        // url: routes.dashboard.companies.index,
        notAdmin: true,
      },
      {
        key: "administrators",
        icon: usersIcon,
        label: "Administrators",
        // url: routes.dashboard.administrators.index,
        notAdmin: true,
      },
      {
        key: "cost-code-library",
        icon: DeliveryEntityIcon,
        label: "Cost Code Library",
        // url: routes.dashboard.costCodeLibrary.index,
        notAdmin: true,
      },
      {
        key: "categories-and-items",
        icon: DeliveryEntityIcon,
        label: "Categories and Items",
        // url: routes.dashboard.categoriesAndItems.index,
        notAdmin: true,
      },
      {
        key: "branch-data",
        icon: DeliveryEntityIcon,
        label: "Branch Data",
        children: [
          {
            key: "sites",
            icon: packageCheckIcon,
            label: "Sites",
            // url: routes.dashboard.sites.index,
          },
          {
            key: "users",
            icon: packageCheckIcon,
            label: "Users",
            // url: routes.dashboard.users.index,
          },
          {
            key: "suppliers",
            icon: packageCheckIcon,
            label: "Suppliers",
            // url: routes.dashboard.suppliers.index,
          },
          {
            key: "subcontractors",
            icon: packageCheckIcon,
            label: "Subcontractors",
            // url: routes.dashboard.subcontractors.index,
          },
        ],
      },
    ],
  },

  {
    key: "operations",
    label: "Operations",
    icon: OperationsIcon,
    children: [
      {
        key: "requests",
        icon: packageCheckIcon,
        label: "Requests",
        // url: routes.dashboard.requests.index,
      },
      {
        key: "purchase-orders",
        icon: packageCheckIcon,
        label: "Purchase Orders",
        // url: routes.dashboard.purchaseOrders.index,
      },
      {
        key: "delivery-notes",
        icon: packageCheckIcon,
        label: "Delivery Notes",
        // url: routes.dashboard.deliveryNotes.index,
      },
      {
        key: "payment-orders",
        icon: PaymentsIcon,
        label: "Payment Orders",
        // url: routes.dashboard.paymentOrders.index,
      },
      {
        key: "return-slips",
        icon: packageCheckIcon,
        label: "Return Slips",
        // url: routes.dashboard.returnSlips.index,
      },
    ],
  },
  {
    key: "Reports",
    label: "Reports",
    icon: OperationsIcon,
    children: [
      {
        key: "site-movement",
        icon: packageCheckIcon,
        label: "Site Movement",
        // url: routes.dashboard.siteMovement.index,
      },
      {
        key: "procurement-statistics",
        icon: packageCheckIcon,
        label: "Procurement Statistics",
        // url: routes.dashboard.procurementStatistics.index,
      },
      {
        key: "payment-statistics",
        icon: packageCheckIcon,
        label: "Payment Statistics",
        // url: routes.dashboard.paymentStatistics.index,
      },
      {
        key: "site-stock",
        icon: packageCheckIcon,
        label: "Site Stock",
        // url: routes.dashboard.siteStock.index,
      },
    ],
  },
  {
    key: "ai",
    icon: MapIcon,
    label: "AI",
    // url: routes.dashboard.ai.index,
  },
  {
    key: "tutorials",
    icon: chatIcon,
    label: "tutorials",
    // url: routes.dashboard.tutorials.index,
  },
];
