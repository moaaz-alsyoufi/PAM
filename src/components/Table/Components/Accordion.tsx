import pencilIcon from "@iconify/icons-lucide/pencil";
import plusIcon from "@iconify/icons-lucide/plus";
import trashIcon from "@iconify/icons-lucide/trash";
import previewIcon from "@iconify/icons-lucide/eye";

import { useState } from "react";

import { Button, useDialog } from "@/components/daisyui";

import Icon from "@/components/Icon";
import DialogComponent from "./Dialog";

interface AccordionProps {
  rowData: object;
  actions: boolean;
  showAction?: boolean;
  deleteAction?: boolean;
  editAction?: boolean;
  onEdit?: (data: any) => void;
  onDelete?: (id: number) => void;
  onShow?: (id: number) => void;
  title: string;
}

interface AccordionsProps {
  accordionData: any[];
  columns: Record<string, string>;
  actions: boolean;
  showAction?: boolean;
  deleteAction?: boolean;
  editAction?: boolean;
  inputFields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
  }>;
  title?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  onDelete,
  onEdit,
  onShow,
  title,
  rowData,
  actions,
  showAction,
  deleteAction,
  editAction,
}) => {
  const handleDelete = () => {
    onDelete;
  };

  const handleEdit = () => {
    onEdit;
  };

  return (
    <>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">{title}</div>
        <div className="collapse-content text-lg space-y-2">
          {Object.entries(rowData).map(([key, value], index) => (
            <span key={index} className="block">
              {key}: {value}
            </span>
          ))}
          {actions && (
            <div className="w-full flex justify-end items-center">
              {showAction && (
                <Button
                  color="ghost"
                  size="sm"
                  shape={"square"}
                  aria-label="Preview"
                  onClick={() => onShow}
                >
                  <Icon
                    icon={previewIcon}
                    className="text-base-content/70"
                    fontSize={15}
                  />
                </Button>
              )}
              {editAction && (
                <Button
                  color="ghost"
                  size="sm"
                  shape={"square"}
                  aria-label="Edit"
                  onClick={handleEdit}
                >
                  <Icon
                    icon={pencilIcon}
                    className="text-base-content/70"
                    fontSize={15}
                  />
                </Button>
              )}
              {deleteAction && (
                <Button
                  color="ghost"
                  className="text-error/70 hover:bg-error/20"
                  size="sm"
                  shape={"square"}
                  aria-label="Delete"
                  onClick={handleDelete}
                >
                  <Icon icon={trashIcon} fontSize={16} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const AccordionComponent: React.FC<AccordionsProps> = ({
  actions,
  accordionData,
  inputFields,
  title,
  showAction,
  deleteAction,
  editAction,
}) => {
  const { dialogRef, handleShow, handleHide } = useDialog();
  const [dialogType, setDialogType] = useState<"Add" | "Edit" | "Preview">(
    "Add"
  );
  const [currentRow, setCurrentRow] = useState<any | null>(null);

  const openDialog = () => {
    setDialogType("Add");
    setCurrentRow(null);
    handleShow();
  };

  const openEditDialog = (data: any) => {
    setDialogType("Edit");
    setCurrentRow(data);
    handleShow();
  };

  const openPreviewDialog = (data: any) => {
    setDialogType("Preview");
    setCurrentRow(data);
    handleShow();
  };

  const handleDelete = (id: number) => {
    console.log(`Delete row with ID: ${id}`);
  };

  const handleSuccess = () => {
    console.log("Dialog action completed!");
    handleHide();
  };

  return (
    <>
      <Button
        onClick={openDialog}
        className="btn btn-ghost btn-xs h-8 border border-base-content/20 mb-4"
      >
        <Icon icon={plusIcon} fontSize={16} />
        New {title}
      </Button>
      <div className="w-full space-y-4">
        {accordionData.map((data, index) => (
          <Accordion
            rowData={data}
            key={index}
            onEdit={openEditDialog}
            onDelete={handleDelete}
            title={"title"}
            actions={actions}
            onShow={openPreviewDialog}
            showAction={showAction}
            editAction={editAction}
            deleteAction={deleteAction}
          />
        ))}
      </div>
      <DialogComponent
        dialogRef={dialogRef}
        handleHide={handleHide}
        dialogType={dialogType}
        current={currentRow}
        onSuccess={handleSuccess}
        inputFields={inputFields}
        title={title}
      />
    </>
  );
};

export default AccordionComponent;
