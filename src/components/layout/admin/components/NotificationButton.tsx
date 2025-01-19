import bellIcon from "@iconify/icons-lucide/bell";
import xIcon from "@iconify/icons-lucide/x";

import { useState } from "react";

import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "@/components/daisyui";

import Icon from "@/components/Icon";

const NotificationButton = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  // Dynamic notifications array
  const notifications = [
    {
      title: "Customer has requested a return for an item",
      time: "1 Hour ago",
    },
    {
      title: "A new review has been submitted for a product",
      time: "1 Hour ago",
    },
    {
      title: "Prepare for the upcoming weekend promotion",
      time: "2 Hours ago",
    },
    { title: "Product 'ABC123' is running low in stock", time: "3 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
    { title: "Payment received for Order ID: #67890", time: "4 Hours ago" },
  ];

  return (
    <div>
      <Dropdown vertical={"bottom"} end open={open}>
        <DropdownToggle
          className="btn btn-circle btn-ghost btn-sm"
          button={false}
          onClick={() => setOpen(!open)}
        >
          <Icon icon={bellIcon} fontSize={20} />
        </DropdownToggle>
        <DropdownMenu className="card card-compact m-1 w-96 p-3 shadow">
          <div className="flex items-center justify-between px-2">
            <p className="text-base font-medium">Notification</p>
            <Button
              size={"sm"}
              shape={"circle"}
              color={"ghost"}
              startIcon={<Icon icon={xIcon} fontSize={16} />}
              onClick={closeMenu}
            />
          </div>
          <div className="mt-3 h-96 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="my-0.5 flex cursor-pointer items-start gap-3 rounded-box p-1.5 transition-all hover:bg-base-content/5 active:scale-[.98]"
              >
                <div className="grow">
                  <p className="text-sm">{notification.title}</p>
                  <p className="text-xs text-base-content/60">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="-mx-2 mt-2 border-base-content/10" />
          <div className="flex items-center justify-between pt-2">
            <Button
              size={"sm"}
              color={"ghost"}
              className="text-primary hover:bg-primary/10"
            >
              View All
            </Button>
            <Button
              size={"sm"}
              color={"ghost"}
              className="text-base-content/80 hover:bg-base-content/10"
            >
              Mark as read
            </Button>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NotificationButton;
