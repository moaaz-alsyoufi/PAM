import React, { useEffect, useState } from "react";
import { Button, Select, SelectOption } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import { cn } from "@/helpers/utils/cn";
import useRequests from "../use-requests";
import PAMTable from "@/components/Table";
import NewRequestTableComponent from "./RequestTable";

interface CurrentData {
  [key: string]: any;
}

interface DialogProps {
  handleHide: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  dialogType: "Add" | "Edit" | "Preview" | "Select";
  current: CurrentData | null;
  onSuccess: (type: "Add" | "Edit" | "Preview" | "Select") => void;
  previewColumns?: Record<string, string>;
  title: string;
  data?: any[];
  subContractors?: any[];
  costCodes?: any[];
  requestRefNb?: { refNumber: string; reqNo: number };
  reqRemarks?: string;
}

const RequestDialog: React.FC<DialogProps> = ({
  handleHide,
  dialogRef,
  dialogType,
  current,
  onSuccess,
  title,
  previewColumns,
  data,
  costCodes,
  subContractors,
  requestRefNb,
  reqRemarks,
}) => {
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<number>(0);
  const [remarks, setRemarks] = useState("");

  const [items, setItems] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  const { getToken } = useAuthContext();
  const { exportRequest, newRequestColumns, createNewRequest } = useRequests();

  const handleItemsChange = (updatedData: any[]) => {
    setItems(updatedData);
  };

  const handleSubmit = async () => {
    if (dialogType === "Add") {
      if (selectedSubcontractor === 0) {
        toaster.error("Select Subcontractor to send the request");
        return;
      }

      if (items.length === 0) {
        toaster.error("Add items to send the request");
        return;
      } else if (items.length === 1) {
        if (
          items[0].quantity === 0 ||
          items[0].itemId === 0 ||
          items[0].costCodeId === 0
        ) {
          toaster.error("Click on add item on the table to send the request");
          return;
        }
      }
    }
    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        toaster.error("Token is missing, unable to save.");
        return;
      }

      if (dialogType === "Edit" && current) {
      } else if (dialogType === "Add") {
        const updatedItems = items.map((item) => ({
          ...item,
          subId: selectedSubcontractor,
        }));
        setItems(updatedItems);

        const submittedData = {
          remarks: remarks,
          items: updatedItems,
        };

        await createNewRequest(submittedData);
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
        `${dialogType === "Edit" ? "updated" : dialogType === "Preview" ? "Exported" : "created"} successfully.`
      );
      onSuccess(dialogType);

      setItems([]);
      setSelectedSubcontractor(0);
      setRemarks("");
      handleHide();
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
    }
  };

  const handleClose = () => {
    handleHide();
  };

  useEffect(() => {
    if (dialogType === "Edit" && data) {
      setSelectedSubcontractor(data[0].subId);
    }
  }, [dialogType]);

  return (
    <dialog ref={dialogRef} className="modal" aria-modal="true">
      <div
        className={cn("modal-box relative", {
          "max-w-7xl":
            dialogType === "Preview" ||
            dialogType === "Add" ||
            dialogType === "Edit",
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

        <div>
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
                    defaultValue={requestRefNb?.refNumber ?? ""}
                    disabled
                  />
                </label>
                <label className="input input-sm input-bordered flex items-center xs:gap-4 lg:gap-8 text-sm md:text-base">
                  <span className="font-normal opacity-45 w-20 capitalize">
                    Subcontractor
                  </span>
                  {subContractors && (
                    <Select
                      className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                      value={selectedSubcontractor}
                      onChange={(e) =>
                        setSelectedSubcontractor(Number(e.target.value))
                      }
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
                  )}
                </label>
                <label className="flex flex-col sm:flex-row items-center gap-2 input input-sm input-bordered grow">
                  <span className="font-normal text-sm md:text-base opacity-45 min-w-16 md:w-28">
                    Remarks
                  </span>
                  <input
                    type="text"
                    name="remarks"
                    className="grow"
                    defaultValue={dialogType === "Edit" ? reqRemarks : remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </label>
              </div>
              <NewRequestTableComponent
                columns={newRequestColumns}
                items={data}
                actions={true}
                addAction={true}
                deleteAction={true}
                costCodes={costCodes}
                onDataChange={handleItemsChange}
              />
            </div>
          )}

          <div className="text-right mt-5">
            <Button
              className="w-full btn btn-sm"
              type="button"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => handleSubmit()}
            >
              {dialogType === "Add"
                ? "Send Request"
                : dialogType === "Edit"
                  ? "Save"
                  : "Export"}
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default RequestDialog;
