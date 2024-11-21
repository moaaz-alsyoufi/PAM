import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoutIcon from "@iconify/icons-lucide/log-out";
import userIcon from "@iconify/icons-lucide/user-circle";
import menuIcon from "@iconify/icons-lucide/menu";
import deleteIcon from "@iconify/icons-lucide/trash-2";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarCenter,
  NavbarEnd,
  NavbarStart,
} from "@/components/daisyui";
import Icon from "@/components/Icon";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Logo from "@/components/Logo";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import { useLayoutContext } from "@/states/layout";
import { IMenuItem } from "@/types/layout/admin";
import { adminMenuItems } from "@/data/layout/admin";
import { useMemo, useState } from "react";
import { cn } from "@/helpers/utils/cn";

// Function to filter menu items based on user role and other criteria
const filterMenuItems = (
  items: IMenuItem[],
  userRoleId: number | undefined
) => {
  return items
    .map((item) => ({
      ...item,
      children: item.children
        ? item.children.filter((child) => !child.notAdmin || userRoleId === 1)
        : [],
    }))
    .filter(
      (item) => item.children.length > 0 || !item.notAdmin || userRoleId === 1
    );
};

const Topbar = () => {
  const { toggleLeftbarDrawer, state } = useLayoutContext();
  const { logout, authState, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const userRoleId = authState.user?.roleId;
  const [selectedDropdown, setSelectedDropdown] = useState<string | null>(null);
  const [selectedAccountDropdown, setSelectedAccountDropdown] =
    useState<boolean>(false);

  const isActive = (url?: string) => location.pathname === url;

  // Filter menu items based on user role
  const filteredMenuItems = useMemo(
    () => filterMenuItems(adminMenuItems, userRoleId),
    [adminMenuItems, userRoleId]
  );

  const doLogout = () => {
    logout();
    navigate(routes.auth.login);
  };

  const deleteAccount = () => {
    doLogout();
  };

  const handleSpanClick = () => {
    const toggleButton = document.getElementById("themeToggleButton");
    if (toggleButton) {
      toggleButton.click();
    }
  };

  const renderMenuItems = (items: IMenuItem[]) => {
    return items.map((item) => {
      // Render logic for menu items (omitted for brevity)
      if (item.children && item.children.length === 1) {
        // If the parent has only one child, render the child as a link
        const child = item.children[0];
        return (
          <Link
            key={child.key}
            to={child.url || "#"}
            className={`hover:bg-blue-100 hover:text-blue-900 flex flex-col justify-center items-center h-full w-full  rounded-full ${isActive(child.url) ? "bg-blue-200 hover:bg-blue-200 text-blue-900" : ""}`}
          >
            <Icon icon={child.icon || item.icon || ""} fontSize={24} />
          </Link>
        );
      } else if (item.children && item.children.length > 1) {
        // Check if any child is active
        const isChildActive = item.children.some((child) =>
          isActive(child.url)
        );

        // Render Dropdown for items with more than one child
        return (
          <Dropdown
            key={item.key}
            vertical="top"
            onFocus={() => setSelectedDropdown(item.key)} // Set selected dropdown key
            onBlur={() => setSelectedDropdown(null)} // Reset selected dropdown key
          >
            <DropdownToggle
              button={false}
              className={`relative hover:bg-blue-100 hover:text-blue-900 flex flex-col justify-center items-center h-full w-full rounded-full hover:cursor-pointer ${
                isChildActive
                  ? "bg-blue-200 hover:bg-blue-200 text-blue-900"
                  : ""
              }`}
            >
              {selectedDropdown === item.key && (
                <div className="absolute -top-[34px] left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-base-100 dark:bg-base-content z-50" />
              )}

              <Icon icon={item.icon || ""} fontSize={24} />
            </DropdownToggle>
            <DropdownMenu className="mt-4 w-52 dark:bg-base-content dark:text-base-100 mb-6 shadow-xl">
              {/* Arrow pointing to the toggle */}
              {item.children.map((child) => (
                <DropdownItem
                  key={child.key}
                  onClick={() => navigate(child.url || "")}
                  className={`text-sm/none h-full w-full flex items-center space-x-2 hover:bg-blue-100 hover:text-blue-900 ${
                    isActive(child.url)
                      ? "bg-blue-200 text-blue-900 hover:bg-blue-200"
                      : ""
                  }`}
                >
                  <Icon icon={child.icon || ""} fontSize={24} />
                  <span>{child.label}</span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        );
      } else {
        // Render Link for items without children
        return (
          <Link
            key={item.key}
            to={item.url || "#"}
            className={`hover:bg-blue-100 hover:text-blue-900 flex flex-col justify-center items-center h-full w-full rounded-full cursor-pointer ${isActive(item.url) ? "bg-blue-200 hover:bg-blue-200 text-blue-900" : ""}`}
          >
            <Icon icon={item.icon || ""} fontSize={24} />
          </Link>
        );
      }
    });
  };

  return (
    <>
      {/* sm screen */}
      {isLoggedIn() && filteredMenuItems.length !== 0 && (
        <div className="md:hidden btm-nav z-50 fixed bottom-4 flex w-full max-w-[90%] rounded-full shadow-xl p-2 mx-auto space-x-1 dark:bg-base-content dark:text-base-100  border border-base-300">
          {renderMenuItems(filteredMenuItems)}

          {/* Account Dropdown */}
          <Dropdown vertical="top" end>
            <DropdownToggle
              button={false}
              className="relative hover:bg-blue-100 hover:text-blue-900 rounded-full hover:cursor-pointer flex flex-col justify-center items-center h-full w-full"
              onFocus={() => setSelectedAccountDropdown(true)}
              onBlur={() => setSelectedAccountDropdown(false)}
            >
              {selectedAccountDropdown && (
                <div className="absolute -top-[34px] left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-base-100 dark:bg-base-content z-50" />
              )}
              <Icon icon={userIcon} fontSize={24} className="mb-0.5" />
            </DropdownToggle>
            <DropdownMenu className="mt-4 w-52 dark:bg-base-content dark:text-base-100 mb-6 shadow-xl">
              <DropdownItem>
                <p className="text-sm/none">
                  {authState.user?.name ?? "User Name"}
                </p>
              </DropdownItem>
              <hr className="-mx-2 my-1 border-base-content/10" />
              <DropdownItem onClick={handleSpanClick}>
                <ThemeToggleButton
                  id="themeToggleButton"
                  shape="circle"
                  color="ghost"
                  size="xs"
                />
                <span className="hidden dark:inline">Light mode</span>
                <span className="dark:hidden">Dark mode</span>
              </DropdownItem>
              <hr className="-mx-2 my-1 border-base-content/10" />
              <DropdownItem className="text-error" onClick={deleteAccount}>
                <Icon icon={deleteIcon} fontSize={24} />
                Delete Account
              </DropdownItem>
              <hr className="-mx-2 my-1 border-base-content/10" />
              <DropdownItem className="text-error" onClick={doLogout}>
                <Icon icon={logoutIcon} fontSize={24} />
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}

      {/* md screen */}
      {isLoggedIn() && filteredMenuItems.length !== 0 ? (
        <Navbar className="z-10 border-b border-base-200 px-3 hidden md:block">
          <NavbarStart className="gap-3">
            <Button
              shape="square"
              color="ghost"
              size="sm"
              onClick={() => toggleLeftbarDrawer(!state.leftbar.drawerOpen)}
            >
              <Icon icon={menuIcon} className="inline-block" fontSize={24} />
            </Button>
          </NavbarStart>
          <NavbarCenter></NavbarCenter>
          <NavbarEnd className="gap-1.5">
            <ThemeToggleButton shape="circle" color="ghost" size="sm" />
            <Dropdown vertical="bottom" end>
              <DropdownToggle
                className="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
                button={false}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm/none">
                    {authState.user?.name ?? "User Name"}
                  </p>
                </div>
              </DropdownToggle>
              <DropdownMenu className="mt-4 w-52">
                <hr className="-mx-2 my-1 border-base-content/10" />

                <DropdownItem className="text-error" onClick={deleteAccount}>
                  <Icon icon={deleteIcon} fontSize={24} />
                  Delete Account
                </DropdownItem>

                <hr className="-mx-2 my-1 border-base-content/10" />
                <DropdownItem className="text-error" onClick={doLogout}>
                  <Icon icon={logoutIcon} fontSize={24} />
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarEnd>
        </Navbar>
      ) : (
        <Navbar className={cn("z-10 border-b border-base-200 px-3", {})}>
          <NavbarStart className="gap-3">
            <Logo />
          </NavbarStart>
          <NavbarCenter></NavbarCenter>
          <NavbarEnd className="gap-1.5">
            <ThemeToggleButton shape="circle" color="ghost" size="sm" />
            <Dropdown vertical="bottom" end>
              <DropdownToggle
                button={false}
                className="hover:bg-base-content/15 w-full h-full btn btn-ghost"
              >
                Account
              </DropdownToggle>
              <DropdownMenu className="mt-4 w-52">
                <DropdownItem onClick={() => navigate(routes.auth.login)}>
                  <p className="text-sm/none my-1 border-base-content/10">
                    Login
                  </p>
                </DropdownItem>
                <hr className="-mx-2 my-1 border-base-content/10" />

                <DropdownItem onClick={() => navigate(routes.auth.register)}>
                  <p className="text-sm/none my-1 border-base-content/10">
                    Create Account
                  </p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarEnd>
        </Navbar>
      )}
    </>
  );
};

export default Topbar;
