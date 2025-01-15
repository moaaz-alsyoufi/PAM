import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import searchIcon from "@iconify/icons-lucide/search";
import sortAscIcon from "@iconify/icons-lucide/chevron-up";
import sortDescIcon from "@iconify/icons-lucide/chevron-down";
import trashIcon from "@iconify/icons-lucide/trash";
import addIcon from "@iconify/icons-lucide/plus-circle";
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
import { cn } from "@/helpers/utils/cn";
import AutoComplete from "@/components/daisyui/AutoComplete/AutoComplete";
import DialogComponent from "@/components/Table/Components/Dialog";
import useRequests from "../use-requests";

interface Column {
  key: string;
  label: string;
  isInput?: boolean;
  required?: boolean;
  inputType?: string;
  disabled?: boolean;
  options?: any[];
}

interface TableProps {
  columns: Column[];
  actions: boolean;
  deleteAction?: boolean;
  addAction?: boolean;
  addBtn?: boolean;
  items?: any[];
  costCodes?: any[];
  onDataChange?: (data: any[]) => void;
}

const NewRequestTableComponent: React.FC<TableProps> = ({
  columns,
  actions,
  deleteAction,
  addAction,
  items,
  costCodes,
  onDataChange,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [costCodeId, setCostCodeId] = useState<number | null>(null);
  const [savedRows, setSavedRows] = useState<Set<number>>(new Set());
  const { dialogRef, handleShow, handleHide } = useDialog();
  const { costCodeColumns } = useRequests();
  const [selectedRoweIndex, setSelectedRoweIndex] = useState<number | null>(
    null
  );

  const [sentItems, setSentItems] = useState<
    {
      itemId: number;
      quantity: number;
      costCodeId: number;
      subId: number;
    }[]
  >([
    {
      itemId: 0,
      quantity: 0,
      costCodeId: 0,
      subId: 0,
    },
  ]);

  const dataWithEmptyRow = useMemo(() => {
    const emptyRow = columns.reduce(
      (acc, column) => {
        acc[column.key] = "";
        return acc;
      },
      {} as Record<string, any>
    );

    return [...tableData, emptyRow];
  }, [tableData, columns]);

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return dataWithEmptyRow.filter((d) =>
      Object.values(d).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, dataWithEmptyRow]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortColumn, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (column: string) => {
    setSortOrder((prevOrder) =>
      sortColumn === column && prevOrder === "asc" ? "desc" : "asc"
    );
    setSortColumn(column);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (index: number) => {
    setTableData((prevData) =>
      prevData.filter((_, rowIndex) => rowIndex !== index)
    );
    setSavedRows((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(index);
      return updatedSet;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
    rowIndex: number
  ) => {
    const { value } = event.target;

    if (key === "quantity") {
      setQuantity(parseInt(value));
      const updatedData = [...dataWithEmptyRow];
      updatedData[rowIndex].quantity = value;

      const updatedItems = [...sentItems];
      updatedItems[rowIndex].quantity = parseInt(value);

      setSentItems(updatedItems);

      if (onDataChange) {
        onDataChange(updatedItems);
      }
    }
  };

  const handleOpenCodeDialog = (rowIndex: number) => {
    setSelectedRoweIndex(rowIndex);
    handleShow();
  };

  const handleOptionSelect = (option: any, rowIndex: number) => {
    setSelectedOption(option);
    const updatedData = [...dataWithEmptyRow];
    updatedData[rowIndex].itemName = option.text;
    updatedData[rowIndex].itemUnit = option.itemUnit;

    const updatedItems = [...sentItems];
    updatedItems[rowIndex].itemId = parseInt(option.itemId);

    if (onDataChange) {
      onDataChange(updatedItems);
    }
  };

  const handleCostCodeSelect = (costCode: any) => {
    setCostCodeId(costCode.codeId);

    const updatedData = [...dataWithEmptyRow];
    updatedData[selectedRoweIndex ?? 0].code = costCode.code;

    const updatedItems = [...sentItems];
    updatedItems[selectedRoweIndex ?? 0].costCodeId = costCode.codeId;

    if (onDataChange) {
      onDataChange(updatedItems);
    }
    handleHide();
  };

  const handleAdd = (row: any) => {
    const newRow = { ...row };
    const newItem = {
      itemId: 0,
      quantity: 0,
      costCodeId: 0,
      subId: 0,
    };

    setTableData((prevData) => [...prevData, newRow]);
    setSentItems((prevItems) => [...prevItems, newItem]);
    setSavedRows((prev) => new Set(prev).add(tableData.length));
    setCostCodeId(null);
    setQuantity(0);
    setSelectedOption(null);
  };

  return (
    <>
      <Card className="bg-base-100">
        <CardBody className="p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end px-5 pt-5 space-y-4 sm:space-y-0">
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
          <div className="overflow-auto pb-24">
            <table className="w-full border-collapse">
              <thead>
                <tr className="hover:bg-base-200/40">
                  {columns.map(({ key, label }) => (
                    <th
                      key={key}
                      className="border-b border-base-content/5 px-2 pl-6 py-3 text-sm text-left font-normal"
                    >
                      <div
                        className="flex justify-start items-center cursor-pointer"
                        onClick={() => handleSort(key)}
                      >
                        <span>{label}</span>
                        {sortColumn === key && (
                          <Icon
                            icon={
                              sortOrder === "asc" ? sortAscIcon : sortDescIcon
                            }
                            className="ml-1"
                            fontSize={14}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                  {actions && (
                    <th className="border-b border-base-content/5 pl-2 pr-6 py-3 text-sm text-right font-normal">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dataWithEmptyRow.map((row, index) => (
                  <tr key={index} className="hover:bg-base-200/40">
                    {columns.map(
                      ({
                        key,
                        isInput,
                        inputType,
                        required,
                        disabled,
                        options,
                      }) => (
                        <td
                          key={key}
                          className="border-y border-base-content/5 px-2 pl-6 py-3 font-medium text-sm"
                        >
                          {isInput ? (
                            inputType === "select" &&
                            options &&
                            items &&
                            items.length > 0 ? (
                              <AutoComplete
                                options={items}
                                searchKey="text"
                                placeholder="Search item..."
                                onOptionSelect={(option) =>
                                  handleOptionSelect(option, index)
                                }
                              />
                            ) : key === "code" ? (
                              <label
                                onClick={() => handleOpenCodeDialog(index)}
                                className="cursor-pointer"
                              >
                                {row.code ? row.code : "Select Cost Code"}
                              </label>
                            ) : (
                              <Input
                                type={inputType}
                                required={required}
                                value={
                                  key === "itemUnit" && row.itemUnit
                                    ? row.itemUnit
                                    : undefined
                                }
                                size="sm"
                                defaultValue={
                                  key === "itemUnit"
                                    ? selectedOption?.itemUnit
                                    : (row[key] ?? "")
                                }
                                className="w-full border-none disabled:bg-base-100 focus:outline-none"
                                disabled={disabled}
                                onChange={(event) =>
                                  handleInputChange(event, key, index)
                                }
                              />
                            )
                          ) : (
                            (row[key] ?? "-")
                          )}
                        </td>
                      )
                    )}
                    {actions && (
                      <td className="border-y border-base-content/5 px-2 py-3 font-medium text-sm text-right pr-6">
                        <div className="inline-flex w-fit">
                          {!savedRows.has(index) && addAction && (
                            <Button
                              color="ghost"
                              className="text-success/70 hover:bg-success/20"
                              size="sm"
                              shape="square"
                              aria-label="Add Row"
                              type="button"
                              onClick={() => handleAdd(row)}
                              disabled={
                                !quantity || !costCodeId || !selectedOption
                              }
                            >
                              <Icon icon={addIcon} fontSize={16} />
                            </Button>
                          )}
                          {savedRows.has(index) && deleteAction && (
                            <Button
                              color="ghost"
                              className="text-error/70 hover:bg-error/20"
                              size="sm"
                              shape="square"
                              aria-label="Delete Row"
                              type="button"
                              onClick={() => handleDelete(index)}
                            >
                              <Icon icon={trashIcon} fontSize={16} />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-end px-5 pb-5 pt-3">
              <Pagination>
                <Button
                  type="button"
                  size="sm"
                  aria-label="pagination-prev"
                  className="join-item"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <Icon icon={chevronLeftIcon} fontSize={16} />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className={cn("join-item", {
                    "bg-base-100": currentPage === 1,
                  })}
                  active={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </Button>
                {currentPage > 3 && <span className="join-item"> </span>}
                {Array.from({ length: 3 }, (_, index) => {
                  const page = currentPage - 1 + index;
                  if (page > 1 && page < totalPages) {
                    return (
                      <Button
                        type="button"
                        key={page}
                        size="sm"
                        className={cn("join-item", {
                          "bg-base-100": currentPage === page,
                        })}
                        active={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  }
                  return null;
                })}
                {currentPage < totalPages - 2 && (
                  <span className="join-item"> </span>
                )}
                {totalPages > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    className={cn("join-item", {
                      "bg-base-100": currentPage === totalPages,
                    })}
                    active={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  aria-label="pagination-next"
                  className="join-item"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <Icon icon={chevronRightIcon} fontSize={16} />
                </Button>
              </Pagination>
            </div>
          )}
        </CardBody>
      </Card>

      <DialogComponent
        handleHide={handleHide}
        dialogRef={dialogRef}
        dialogType={"Select"}
        current={null}
        onSuccess={() => {}}
        inputFields={[]}
        title={"Cost Codes"}
        data={costCodes}
        previewColumns={costCodeColumns}
        onSelect={handleCostCodeSelect}
      />
    </>
  );
};
export default NewRequestTableComponent;
