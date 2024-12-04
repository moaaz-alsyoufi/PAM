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
  Table,
  TableBody,
  TableHead,
  TableRow,
  useDialog,
} from "@/components/daisyui";
import Icon from "@/components/Icon";
import { IUser } from "@/types/apps/ecommerce";
import DialogComponent from "./Dialog";

interface RowProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}

const Row: React.FC<RowProps> = ({ user, onEdit, onDelete }) => {
  const handleDelete = () => {
    onDelete; // (id)
  };

  return (
    <TableRow className="cursor-pointer hover:bg-base-200/40">
      <></>

      <div className="inline-flex w-fit">
        <Button
          color="ghost"
          size="sm"
          shape={"square"}
          aria-label="Edit user"
          onClick={() => onEdit(user)}
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
          shape={"square"}
          aria-label="Delete user"
          onClick={handleDelete}
        >
          <Icon icon={trashIcon} className="" fontSize={16} />
        </Button>
      </div>
    </TableRow>
  );
};

const TableComponent = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { dialogRef, handleShow, handleHide } = useDialog();

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return users.filter((user) => {
      return Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowercasedQuery)
      );
    });
  }, [searchQuery, users]);

  const sortedData = useMemo(() => {
    const sortedData = [...filteredData];

    if (sortColumn) {
      sortedData.sort((a, b) => {
        const aValue = a[sortColumn as keyof IUser];
        const bValue = b[sortColumn as keyof IUser];

        if (!aValue || !bValue) return 0;
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortedData;
  }, [filteredData, sortColumn, sortOrder]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const openDialog = () => {
    setDialogType("Add");
    setCurrentUser(null);
    handleShow();
  };

  const openEditDialog = (user: IUser) => {
    setDialogType("Edit");
    setCurrentUser(user);
    handleShow();
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <>
      <Card className="bg-base-100">
        <CardBody className={"p-0"}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between px-5 pt-5 space-y-4 sm:space-y-0">
            <Button
              onClick={openDialog}
              className="btn btn-ghost btn-xs h-8 border border-base-content/20"
            >
              <Icon icon={plusIcon} fontSize={16} />
              Add User
            </Button>
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2">
              <Icon
                icon={searchIcon}
                className="text-base-content/60"
                fontSize={15}
              />
              <Input
                size="sm"
                placeholder="Search users"
                bordered={false}
                borderOffset={false}
                className="w-full focus:border-transparent focus:outline-0"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="overflow-auto">
            <Table className="mt-2 rounded-box">
              <TableHead>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("id")}
                >
                  <span>ID</span>
                  {sortColumn === "id" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("name")}
                >
                  <span>Name</span>
                  {sortColumn === "name" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("username")}
                >
                  <span>Username</span>
                  {sortColumn === "username" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("phone")}
                >
                  <span>Phone</span>
                  {sortColumn === "phone" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("deliveryCost")}
                >
                  <span>Delivery Cost</span>
                  {sortColumn === "deliveryCost" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("loyaltyPoints")}
                >
                  <span>Loyalty Points</span>
                  {sortColumn === "loyaltyPoints" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>
                <span className="text-sm font-medium text-base-content/80">
                  Verified
                </span>
                <span className="text-sm font-medium text-base-content/80">
                  Role
                </span>
                <span
                  className="text-sm font-medium text-base-content/80 cursor-pointer flex space-x-2 items-center"
                  onClick={() => handleSort("DeliveryEntity")}
                >
                  <span>Delivery Entity</span>
                  {sortColumn === "DeliveryEntity" && (
                    <Icon
                      icon={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
                      className="ml-1"
                      fontSize={14}
                    />
                  )}
                </span>

                <span className="text-sm font-medium text-base-content/80 ml-2.5">
                  Actions
                </span>
              </TableHead>
              <TableBody>
                {sortedData.map((user) => (
                  <Row
                    key={user.id}
                    user={user}
                    onEdit={openEditDialog}
                    onDelete={handleDeleteUser} // Pass the handleDeleteUser function
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <DialogComponent
        dialogRef={dialogRef}
        handleHide={handleHide}
        dialogType={dialogType}
        currentUser={currentUser}
        onSuccess={() => {}}
      />
    </>
  );
};

export default TableComponent;
