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
import { Loader } from "@/components/Loader";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

// TODO::
// 1- if the user click on the notification
// we should open the request details page to show the user the requested items

// 2- then add approve, reject buttons below it

// 3- when he click approve
// he will go to approve api

// 4- when he click reject
// he will go to reject api

const NotificationButton = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  const getNotifications = async () => {
    setLoading(true);
    apiRequest(`Requests/notifications/${siteId}`, "GET", token)
      .then((res: any[]) => {
        setNotifications(res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleOpenMenu = async () => {
    setOpen(true);
    await getNotifications();
  };

  return (
    <div>
      <Dropdown vertical={"bottom"} end open={open}>
        <DropdownToggle
          className="btn btn-circle btn-ghost btn-sm"
          button={false}
          onClick={handleOpenMenu}
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
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="mt-3 h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <span>Your notifications are clean</span>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="my-0.5 flex cursor-pointer items-start gap-3 rounded-box p-1.5 transition-all hover:bg-base-content/5 active:scale-[.98]"
                    >
                      <div className="grow">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-base-content/60">Now</p>
                      </div>
                      <hr />
                    </div>
                  ))
                )}
              </div>
              <hr className="-mx-2 mt-2 border-base-content/10" />
              <div className="flex items-center justify-between pt-2">
                <Button
                  size={"sm"}
                  color={"ghost"}
                  className="text-primary hover:bg-primary/10"
                  disabled={notifications.length === 0}
                >
                  View All
                </Button>
                <Button
                  size={"sm"}
                  color={"ghost"}
                  className="text-base-content/80 hover:bg-base-content/10"
                  disabled={notifications.length === 0}
                >
                  Mark as read
                </Button>
              </div>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NotificationButton;
