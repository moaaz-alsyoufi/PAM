import pencilIcon from "@iconify/icons-lucide/pencil";
import plusIcon from "@iconify/icons-lucide/plus";
import trashIcon from "@iconify/icons-lucide/trash";
import { useState } from "react";

import { Button, useDialog } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { IUser } from "@/types/apps/ecommerce";
import UserDialog from "./Components/UserDialog";

interface UserAccordionProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}
const UserAccordion: React.FC<UserAccordionProps> = ({ user, onEdit }) => {
  return (
    <>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">name</div>
        <div className="collapse-content text-lg space-y-2">
          <p>Username: username</p>

          <div className="w-full flex justify-end items-center">
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
            >
              <Icon icon={trashIcon} fontSize={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const UserAccordions = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { dialogRef, handleShow, handleHide } = useDialog();
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const handleSuccess = () => {
    // fetchUsers();
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
      <Button
        onClick={openDialog}
        className="btn btn-ghost btn-xs h-8 border border-base-content/20 mb-4"
      >
        <Icon icon={plusIcon} fontSize={16} />
        New User
      </Button>
      <div className="w-full space-y-4">
        {users.map((user, index) => (
          <UserAccordion
            user={user}
            key={index}
            onEdit={openEditDialog}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
      <UserDialog
        dialogRef={dialogRef}
        handleHide={handleHide}
        dialogType={dialogType}
        currentUser={currentUser}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default UserAccordions;
