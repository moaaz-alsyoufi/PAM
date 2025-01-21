import React, { useState, useEffect } from "react";
import { Button, Select, SelectOption } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import PAMTable from "..";
import { cn } from "@/helpers/utils/cn";
import useRequests from "@/pages/admin/dashboard/operations/requests/use-requests";

interface InputField {
  name: string;
  type: string;
  value?: any;
  required?: boolean;
  options?: any[];
}

interface CurrentData {
  [key: string]: any;
}

interface DialogProps {
  handleHide: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  dialogType: "Add" | "Edit" | "Preview" | "Select" | "Approve";
  current: CurrentData | null;
  onSuccess: (
    type: "Add" | "Edit" | "Preview" | "Select" | "Approve",
    formData: any
  ) => void;
  inputFields: InputField[];
  previewColumns?: Record<string, string>;
  title: string;
  data?: any[];
  onSelect?: (costCode: any) => void;
  materialId?: number;
}

const DialogComponent: React.FC<DialogProps> = ({
  handleHide,
  dialogRef,
  dialogType,
  current,
  onSuccess,
  inputFields,
  title,
  previewColumns,
  data,
  onSelect,
  materialId,
}) => {
  // Initialize form data based on inputFields and current data
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    inputFields.forEach((field) => {
      if (
        dialogType === "Edit" &&
        current &&
        current[field.name] !== undefined
      ) {
        initialData[field.name] = current[field.name];
      } else {
        initialData[field.name] = field.value || "";
      }
    });
    return initialData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  const { getToken } = useAuthContext();
  const { exportRequest, approveRequest, rejectRequest } = useRequests();

  // Optional: Update formData when current changes (e.g., when editing a different user)
  useEffect(() => {
    if (dialogType === "Edit" && current) {
      setFormData((prevData) => ({
        ...prevData,
        ...current,
      }));
    }
  }, [current, dialogType]);

  const handleRowSelect = (costCode: any) => {
    onSelect && onSelect(costCode);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formData);

    try {
      const token = getToken();
      if (!token) {
        toaster.error("Token is missing, unable to save.");
        return;
      }

      if (dialogType === "Edit" && current) {
      } else if (dialogType === "Add") {
      } else if (dialogType === "Preview") {
        const currentPageUrl = location.pathname.split("/").pop();
        if (currentPageUrl === "requests") {
          try {
            const pdfBlob = await exportRequest(current?.materialId);
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");
            console.log("PDF opened successfully");
          } catch (error) {
            console.error("Error opening PDF:", error);
          }
        }
      }

      toaster.success(
        `${dialogType === "Edit" ? "updated" : "created"} successfully.`
      );
      onSuccess(dialogType, formData);
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

  const handleApprove = async () => {
    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        toaster.error("Token is missing, unable to save.");
        return;
      }

      if (dialogType === "Approve") {
        try {
          const res = await approveRequest(materialId ?? 0);
          console.log(res);
        } catch (error) {
          console.error("Error approving request:", error);
        }
      }

      toaster.success("Request Approved successfully.");
      handleClose();
    } catch (error: any) {
      console.error("Error reject request:", error);
      if (error.response) {
        toaster.error(
          `Failed to reject request. Server responded with status ${error.response.status}: ${error.response.data}`
        );
      } else if (error.request) {
        toaster.error(
          "Failed to reject request. No response received from the server."
        );
      } else {
        toaster.error(`Failed to reject request. Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        toaster.error("Token is missing, unable to save.");
        return;
      }

      if (dialogType === "Approve") {
        try {
          const res = await rejectRequest(materialId ?? 0);
          console.log(res);
        } catch (error) {
          console.error("Error reject request:", error);
        }
      }

      toaster.success("Request Rejected successfully.");
      handleClose();
    } catch (error: any) {
      console.error("Error approve request:", error);
      if (error.response) {
        toaster.error(
          `Failed to approve request. Server responded with status ${error.response.status}: ${error.response.data}`
        );
      } else if (error.request) {
        toaster.error(
          "Failed to approve request. No response received from the server."
        );
      } else {
        toaster.error(`Failed to approve request. Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamically render inputs based on inputFields
  const renderInput = (field: InputField) => {
    const { name, type, required, options } = field;
    {
      if (type === "select") {
        return (
          <label className="input input-sm input-bordered flex items-center xs:gap-4 lg:gap-12 text-sm md:text-base">
            <span className="font-normal opacity-45 w-20 capitalize">
              {name}
            </span>
            <Select
              className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
              name={name}
              value={formData[name]}
              required={required}
              onTouchStart={(e) => {
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              }}
            >
              {(options ?? []).map((option) => (
                <SelectOption
                  key={option}
                  value={option}
                  className="bg-base-100"
                >
                  {option.name}
                </SelectOption>
              ))}
            </Select>
          </label>
        );
      } else {
        return (
          <label
            className="flex flex-col sm:flex-row items-center gap-2 input input-sm input-bordered"
            key={name}
          >
            <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
            <input
              type={type}
              name={name}
              className="grow"
              value={formData[name]}
              required={required}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
            />
          </label>
        );
      }
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" aria-modal="true">
      <div
        className={cn("modal-box relative", {
          "max-w-7xl": dialogType === "Preview" || dialogType === "Approve",
          "max-w-5xl": dialogType === "Select",
        })}
      >
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">{title}</h3>

        <form onSubmit={handleSubmit}>
          {dialogType === "Preview" || dialogType === "Approve" ? (
            <PAMTable
              columns={previewColumns ?? {}}
              tableData={data ?? []}
              inputFields={[]}
              actions={false}
              title={"Request Details"}
            />
          ) : dialogType === "Select" ? (
            <PAMTable
              columns={previewColumns ?? {}}
              tableData={data ?? []}
              inputFields={[]}
              actions={false}
              title={"Cost Code"}
              select
              onRowSelect={handleRowSelect}
            />
          ) : (
            <div className="space-y-3 my-4">
              {inputFields.map((field) => (
                <div key={field.name}>{renderInput(field)}</div>
              ))}
            </div>
          )}

          {dialogType !== "Select" && (
            <div className="text-right mt-5">
              {dialogType === "Approve" ? (
                <div className="flex justify-end items-center space-x-4">
                  <Button
                    className="btn btn-sm btn-success"
                    type="button"
                    disabled={isLoading}
                    loading={isLoading}
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                  <Button
                    className="btn btn-sm btn-error"
                    type="button"
                    disabled={isLoading}
                    loading={isLoading}
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full btn btn-sm"
                  type="submit"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {dialogType === "Add"
                    ? "Add"
                    : dialogType === "Edit"
                      ? "Save"
                      : "Export"}
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </dialog>
  );
};

export default DialogComponent;
