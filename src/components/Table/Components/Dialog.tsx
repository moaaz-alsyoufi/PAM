import React, { useState } from "react";
import { Button } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";

interface DialogProps {
  handleHide: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
  dialogType: "Add" | "Edit";
  current: any | null;
  onSuccess: () => void;
  inputFields: Array<{
    name: string;
    type: string;
    value?: any;
    required?: boolean;
  }>;
}

const DialogComponent: React.FC<DialogProps> = ({
  handleHide,
  dialogRef,
  dialogType,
  current,
  onSuccess,
  inputFields,
}) => {
  // Set initial form data based on inputFields
  const [formData, setFormData] = useState(() => {
    const initialData: any = {};
    inputFields.forEach((field) => {
      initialData[field.name] = field.value || "";
    });
    return initialData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  const { getToken } = useAuthContext();

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
        // Handle edit logic here
      } else {
        // Handle add logic here
      }

      toaster.success(
        `${dialogType === "Edit" ? "updated" : "created"} successfully.`
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

  // Dynamically render inputs based on inputFields
  const renderInput = (field: {
    name: string;
    type: string;
    required?: boolean;
  }) => {
    const { name, type, required } = field;
    return (
      <label
        className="input input-sm input-bordered flex items-center gap-2"
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
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        />
      </label>
    );
  };

  return (
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
            {inputFields.map((field) => renderInput(field))}
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
  );
};

export default DialogComponent;
