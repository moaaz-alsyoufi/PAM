import React, { useState, useEffect } from "react";
import { Button } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";

interface InputField {
  name: string;
  type: string;
  value?: any;
  required?: boolean;
}

interface CurrentData {
  [key: string]: any;
}

interface DialogProps {
  handleHide: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  dialogType: "Add" | "Edit";
  current: CurrentData | null;
  onSuccess: () => void;
  inputFields: InputField[];
}

const DialogComponent: React.FC<DialogProps> = ({
  handleHide,
  dialogRef,
  dialogType,
  current,
  onSuccess,
  inputFields,
}) => {
  // Initialize form data based on inputFields and current data
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    inputFields.forEach((field) => {
      if (dialogType === "Edit" && current && current[field.name] !== undefined) {
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

  // Optional: Update formData when current changes (e.g., when editing a different user)
  useEffect(() => {
    if (dialogType === "Edit" && current) {
      setFormData((prevData) => ({
        ...prevData,
        ...current,
      }));
    }
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
        // Example: API call to update user
        await updateUserApi(formData, token);
      } else {
        // Example: API call to add user
        await addUserApi(formData, token);
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
  const renderInput = (field: InputField) => {
    const { name, type, required } = field;
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

// Example API functions (replace with actual implementations)
const addUserApi = async (data: Record<string, any>, token: string) => {
  // Implement your API call to add a user
  // Example using fetch:
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add user.");
  }

  return response.json();
};

const updateUserApi = async (data: Record<string, any>, token: string) => {
  // Implement your API call to update a user
  // Example using fetch:
  const response = await fetch(`/api/users/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user.");
  }

  return response.json();
};

export default DialogComponent;
