import React, { useState } from "react";
import { Button, Divider, Select, SelectOption } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import { IUser } from "@/types/apps/ecommerce";

interface DialogProps {
  handleHide: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
  dialogType: "Add" | "Edit";
  current: IUser | null;
  onSuccess: () => void;
}

const DialogComponent: React.FC<DialogProps> = ({
  handleHide,
  dialogRef,
  dialogType,
  current,
  onSuccess,
}) => {
  const [formData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    roleId: 0,
    deliveryCost: 0,
    loyaltyPoints: 0,
    currentLatitude: 0,
    currentLongitude: 0,
    deliveryEntityId: 0,
    address: "",
    priceList: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { toaster } = useToast();
  const { getToken } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        toaster.error("Token is missing, unable to save user.");
        return;
      }

      if (dialogType === "Edit" && current) {
      } else {
      }

      toaster.success(
        `User ${dialogType === "Edit" ? "updated" : "created"} successfully.`
      );
      onSuccess();
    } catch (error: any) {
      console.error("Error saving user:", error);
      if (error.response) {
        toaster.error(
          `Failed to save user. Server responded with status ${error.response.status}: ${error.response.data}`
        );
      } else if (error.request) {
        toaster.error(
          "Failed to save user. No response received from the server."
        );
      } else {
        toaster.error(`Failed to save user. Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
      handleHide();
    }
  };

  const handleClose = () => {
    handleHide();
  };

  return (
    <>
      <dialog ref={dialogRef} className="modal" aria-modal="true">
        <div className="modal-box relative">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">
            {dialogType === "Add" ? "New" : "Edit"} User
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3 my-4">
              <label className="input input-sm input-bordered flex items-center xs:gap-4 lg:gap-12">
                <span className="font-normal text-sm md:text-base opacity-45 w-20">
                  Role
                </span>
                <Select
                  className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                  name="roleId"
                  value={formData.roleId}
                  required
                  onTouchStart={(e) => {
                    if (e.touches.length > 1) {
                      e.preventDefault();
                    }
                  }}
                >
                  <SelectOption value={0} disabled hidden></SelectOption>
                  <SelectOption className="bg-base-100">Role Name</SelectOption>
                </Select>
              </label>
              <label className="input input-sm input-bordered flex items-center gap-2">
                <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  className="grow"
                  value={formData.name}
                  required
                  onTouchStart={(e) => {
                    if (e.touches.length > 1) {
                      e.preventDefault();
                    }
                  }}
                />
              </label>
              <label className="input input-sm input-bordered flex items-center gap-2">
                <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  className="grow"
                  value={formData.email}
                  required
                  onTouchStart={(e) => {
                    if (e.touches.length > 1) {
                      e.preventDefault();
                    }
                  }}
                />
              </label>
              <label className="input input-sm input-bordered flex items-center gap-2">
                <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  className="grow"
                  value={formData.password}
                  required={dialogType === "Add"}
                  onTouchStart={(e) => {
                    if (e.touches.length > 1) {
                      e.preventDefault();
                    }
                  }}
                />
              </label>
              <label className="input input-sm input-bordered flex items-center gap-2">
                <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                  Phone
                </span>
                <input
                  type="text"
                  name="phone"
                  className="grow"
                  value={formData.phone}
                  required
                  onTouchStart={(e) => {
                    if (e.touches.length > 1) {
                      e.preventDefault();
                    }
                  }}
                />
              </label>
              {formData.roleId > 1 && <Divider />}
              {formData.roleId !== 1 &&
                formData.roleId !== 3 &&
                formData.roleId !== 0 && (
                  <>
                    <label className="input input-sm input-bordered flex items-center gap-2">
                      <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                        Address
                      </span>
                      <input
                        type="text"
                        name="address"
                        className="grow"
                        value={formData.address}
                        onTouchStart={(e) => {
                          if (e.touches.length > 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </label>

                    <label className="input input-sm input-bordered flex items-center gap-2">
                      <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                        Lat
                      </span>
                      <input
                        type="text"
                        name="currentLatitude"
                        className="grow"
                        value={formData.currentLatitude}
                        required
                        onTouchStart={(e) => {
                          if (e.touches.length > 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </label>
                    <label className="input input-sm input-bordered flex items-center gap-2">
                      <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                        Lng
                      </span>
                      <input
                        type="text"
                        name="currentLongitude"
                        className="grow"
                        value={formData.currentLongitude}
                        required
                        onTouchStart={(e) => {
                          if (e.touches.length > 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </label>

                    <Divider />

                    <label className="input input-sm input-bordered flex items-center gap-2">
                      <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                        Delivery Cost
                      </span>
                      <input
                        type="number"
                        name="deliveryCost"
                        className="grow"
                        value={formData.deliveryCost}
                        required
                        onTouchStart={(e) => {
                          if (e.touches.length > 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </label>
                    <label className="input input-sm input-bordered flex items-center gap-2">
                      <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                        Loyalty Points
                      </span>
                      <input
                        type="number"
                        name="loyaltyPoints"
                        className="grow"
                        value={formData.loyaltyPoints}
                        required
                        onTouchStart={(e) => {
                          if (e.touches.length > 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </label>
                  </>
                )}
            </div>

            <div className="text-right">
              <Button
                className="w-full btn btn-sm"
                type="submit"
                disabled={isLoading}
                loading={isLoading}
              >
                {dialogType === "Add" ? "Add" : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DialogComponent;
