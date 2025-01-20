import bellIcon from "@iconify/icons-lucide/bell";
import xIcon from "@iconify/icons-lucide/x";

import { useEffect, useRef, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  useDialog,
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import { Loader } from "@/components/Loader";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";
import useRequests from "@/pages/admin/dashboard/operations/requests/use-requests";
import DialogComponent from "@/components/Table/Components/Dialog";

// TODO::

// 2- then add approve, reject buttons below it

// 3- when he click approve
// he will go to approve api

// 4- when he click reject
// he will go to reject api

const NotificationButton = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { getRequestDetails, previewColumns } = useRequests();
  const { dialogRef, handleShow, handleHide } = useDialog();

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  const getNotifications = async () => {
    setLoading(true);
    try {
      const res: any[] = await apiRequest(
        `Requests/notifications/${siteId}`,
        "GET",
        token
      );
      setNotifications(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleOpenMenu = async () => {
    setOpen(true);
    await getNotifications();
  };

  const handlePreviewNotification = async (materialId: number) => {
    console.log(materialId);

    try {
      const details = await getRequestDetails(materialId);
      setData(details.details);
      handleShow();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (siteId) {
      getNotifications();
    }
  }, [siteId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef}>
        <Dropdown vertical={"bottom"} end open={open}>
          <DropdownToggle
            className="btn btn-circle btn-ghost btn-sm indicator"
            button={false}
            onClick={handleOpenMenu}
          >
            {notifications.length > 0 && (
              <span className="indicator-item bg-warning w-1.5 h-1.5 rounded-full mt-1.5 mr-2.5"></span>
            )}
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
                        onClick={() =>
                          handlePreviewNotification(notification.materialId)
                        }
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

      <DialogComponent
        handleHide={handleHide}
        dialogRef={dialogRef}
        dialogType={"Preview"}
        title={"Request Details"}
        previewColumns={previewColumns}
        data={data}
        current={null}
        onSuccess={() => {}}
        inputFields={[]}
      />
    </>
  );
};

export default NotificationButton;
