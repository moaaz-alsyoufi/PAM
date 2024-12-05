import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import pencilIcon from "@iconify/icons-lucide/pencil";
import plusIcon from "@iconify/icons-lucide/plus";
import searchIcon from "@iconify/icons-lucide/search";
import sortAscIcon from "@iconify/icons-lucide/chevron-up";
import sortDescIcon from "@iconify/icons-lucide/chevron-down";
import trashIcon from "@iconify/icons-lucide/trash";
import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  useDialog,
} from "@/components/daisyui";
import Icon from "@/components/Icon";
import { IUser } from "@/types/apps/ecommerce";
import DialogComponent from "./Dialog";
import { cn } from "@/helpers/utils/cn";

interface TableProps {
  tableData: any[];
  columns: string[];
  actions: boolean;
}

const TableComponent: React.FC<TableProps> = ({
  tableData,
  columns,
  actions,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");
  const [currentRow, setCurrentRow] = useState<IUser | null>(null);
  const { dialogRef, handleShow, handleHide } = useDialog();

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return tableData.filter((d) =>
      Object.values(d).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, tableData]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof IUser];
      const bValue = b[sortColumn as keyof IUser];

      if (!aValue || !bValue) return 0;
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortOrder]);

  const handleSort = (column: string) => {
    setSortOrder((prevOrder) =>
      sortColumn === column && prevOrder === "asc" ? "desc" : "asc"
    );
    setSortColumn(column);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const openDialog = () => {
    setDialogType("Add");
    setCurrentRow(null);
    handleShow();
  };

  const openEditDialog = (user: IUser) => {
    setDialogType("Edit");
    setCurrentRow(user);
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
      <Card className="bg-base-100">
        <CardBody className="p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between px-5 pt-5 space-y-4 sm:space-y-0">
            <Button
              onClick={openDialog}
              className="btn btn-ghost btn-xs h-8 border border-base-content/20"
            >
              <Icon icon={plusIcon} fontSize={16} />
              Add
            </Button>
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2">
              <Icon
                icon={searchIcon}
                className="text-base-content/60"
                fontSize={15}
              />
              <Input
                size="sm"
                placeholder="Search data"
                bordered={false}
                borderOffset={false}
                className="w-full focus:border-transparent focus:outline-0"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="hover:bg-base-200/40">
                  {columns.map((column, index) => (
                    <th
                      key={column}
                      className={cn(
                        "border-b border-base-content/5 px-2 pl-6 py-3 text-sm text-left font-normal",
                        {
                          "pl-6": index === 0,
                        }
                      )}
                    >
                      {column}
                    </th>
                  ))}
                  {actions && (
                    <th className="border-b border-base-content/5 pl-2 pr-6 py-3 text-sm text-right  font-normal">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, index) => (
                    <tr key={index} className="hover:bg-base-200/40">
                      {columns.map((column) => (
                        <td
                          key={column}
                          className="border-y border-base-content/5 px-2 pl-6 py-3 font-medium text-sm"
                        >
                          {row[column] ?? "-"}
                        </td>
                      ))}
                      {actions && (
                        <td className="border-y border-base-content/5 px-2 py-3 font-medium text-sm text-right pr-6">
                          <div className="inline-flex w-fit">
                            <Button
                              color="ghost"
                              size="sm"
                              shape="square"
                              aria-label="Edit Row"
                              onClick={() => openEditDialog(row)}
                            >
                              <Icon
                                icon={pencilIcon}
                                className="text-base-content/70"
                                fontSize={15}
                              />
                            </Button>

                            <Button
                              color="ghost"
                              className="text-error/70 hover:bg-error/20"
                              size="sm"
                              shape="square"
                              aria-label="Delete Row"
                              onClick={() => handleDelete(row.id)}
                            >
                              <Icon icon={trashIcon} fontSize={16} />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr className="cursor-pointer hover:bg-base-200/40">
                    <td
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="p-2 text-center"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end px-5 pb-5 pt-3">
            <Pagination>
              <Button
                size="sm"
                aria-label="pagination-prev"
                className="join-item"
                startIcon={<Icon icon={chevronLeftIcon} fontSize={16} />}
              />
              <Button
                size="sm"
                className="join-item"
                active
                color="primary"
                aria-label="pagination-1"
              >
                1
              </Button>
              <Button size="sm" className="join-item" aria-label="pagination-2">
                2
              </Button>
              <Button
                size="sm"
                aria-label="pagination-next"
                className="join-item"
                startIcon={<Icon icon={chevronRightIcon} fontSize={16} />}
              />
            </Pagination>
          </div>
        </CardBody>
      </Card>
      <DialogComponent
        dialogRef={dialogRef}
        handleHide={handleHide}
        dialogType={dialogType}
        current={currentRow}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default TableComponent;
