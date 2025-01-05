import React, { useState, useEffect } from "react";
import { Button, Select, SelectOption } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import { cn } from "@/helpers/utils/cn";
import useRequests from "../use-requests";
import PAMTable from "@/components/Table";
import NewRequestTableComponent from "./Table";

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
  dialogType: "Add" | "Edit" | "Preview";
  current: CurrentData | null;
  onSuccess: (type: "Add" | "Edit" | "Preview", formData: any) => void;
  inputFields?: InputField[];
  previewColumns?: Record<string, string>;
  title: string;
  data?: any[];
}

const RequestDialog: React.FC<DialogProps> = ({
  handleHide,
  dialogRef,
  dialogType,
  current,
  onSuccess,
  inputFields,
  title,
  previewColumns,
  data,
}) => {
  // Initialize form data based on inputFields and current data
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    inputFields?.forEach((field) => {
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
  const {
    exportRequest,
    newRequestColumns,
    newRequestRefNumber,
    subContractors,

    fetchNewRequestData,
  } = useRequests();

  // Optional: Update formData when current changes (e.g., when editing a different user)
  useEffect(() => {
    if (dialogType === "Edit" && current) {
      setFormData((prevData) => ({
        ...prevData,
        ...current,
      }));
    }
    if (dialogType === "Add") {
      fetchNewRequestData();
    }

    console.log(current);
  }, [current, dialogType]);

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
        try {
          const pdfBlob = await exportRequest(current?.materialId);
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, "_blank");
          console.log("PDF opened successfully");
        } catch (error) {
          console.error("Error opening PDF:", error);
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

  return (
    <dialog ref={dialogRef} className="modal" aria-modal="true">
      <div
        className={cn("modal-box relative", {
          "max-w-7xl": dialogType === "Preview" || dialogType === "Add",
        })}
      >
        <div className="w-full flex justify-between items-center pb-4">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">{title}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {dialogType === "Preview" ? (
            <PAMTable
              columns={previewColumns ?? {}}
              tableData={data ?? []}
              inputFields={[]}
              actions={false}
              title="Request Details"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center space-x-4">
                <label className="flex flex-col sm:flex-row items-center gap-2 input input-sm input-bordered">
                  <span className="font-normal text-sm md:text-base opacity-45 min-w-16">
                    Request
                  </span>
                  <input
                    type="text"
                    defaultValue={newRequestRefNumber ?? ""}
                    disabled
                  />
                </label>
                <label className="input input-sm input-bordered flex items-center xs:gap-4 lg:gap-8 text-sm md:text-base">
                  <span className="font-normal opacity-45 w-20 capitalize">
                    Subcontractor
                  </span>
                  <Select
                    className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                    onTouchStart={(e) => {
                      if (e.touches.length > 1) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <SelectOption className="bg-base-100" value={0} disabled>
                      Select Subcontractor
                    </SelectOption>
                    {subContractors.map((sub) => (
                      <SelectOption
                        key={sub.subId}
                        value={sub.subId}
                        className="bg-base-100"
                      >
                        {sub.subName}
                      </SelectOption>
                    ))}
                  </Select>
                </label>
                <label className="flex flex-col sm:flex-row items-center gap-2 input input-sm input-bordered grow">
                  <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                    Remarks
                  </span>
                  <input type="text" name="remarks" className="grow" />
                </label>
              </div>
              <NewRequestTableComponent
                tableData={[]}
                columns={newRequestColumns}
                actions={false}
              />
            </div>
          )}

          <div className="text-right mt-5">
            <Button
              className="w-full btn btn-sm"
              type="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              {dialogType === "Add"
                ? "Send Request"
                : dialogType === "Edit"
                  ? "Save"
                  : "Export"}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDialog;
