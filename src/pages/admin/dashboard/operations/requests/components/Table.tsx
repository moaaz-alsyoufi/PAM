import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
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
} from "@/components/daisyui";
import Icon from "@/components/Icon";
import { cn } from "@/helpers/utils/cn";

interface Column {
  key: string;
  label: string;
  isInput?: boolean;
  required?: boolean;
  inputType?: string; // e.g., "text", "number", "date", etc.
  disabled?: boolean;
}

interface TableProps {
  tableData: any[];
  columns: Column[];
  actions: boolean;
  showAction?: boolean;
  deleteAction?: boolean;
  editAction?: boolean;
  addBtn?: boolean;
}

const NewRequestTableComponent: React.FC<TableProps> = ({
  tableData,
  columns,
  actions,
  deleteAction,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

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

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPage]);

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

  const handleDelete = (id: number) => {
    console.log(`Delete row with ID: ${id}`);
  };

  return (
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
        <div className="overflow-auto">
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
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-base-200/40">
                  {columns.map(
                    ({ key, isInput, inputType, required, disabled }) => (
                      <td
                        key={key}
                        className="border-y border-base-content/5 px-2 pl-6 py-3 font-medium text-sm"
                      >
                        {isInput ? (
                          <Input
                            type={inputType}
                            required={required}
                            defaultValue={row[key] ?? ""}
                            className="w-full"
                            disabled={disabled}
                          />
                        ) : (
                          (row[key] ?? "-")
                        )}
                      </td>
                    )
                  )}
                  {actions && (
                    <td className="border-y border-base-content/5 px-2 py-3 font-medium text-sm text-right pr-6">
                      <div className="inline-flex w-fit">
                        {deleteAction && (
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
  );
};

export default NewRequestTableComponent;
