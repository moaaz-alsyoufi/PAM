import React, { useCallback } from "react";
import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import { IAuthState } from "@/types/auth/state";

interface AuthContextType {
  authState: IAuthState;
  setLoggedInUser: (
    user: any,
    token: string,
    countries: any[],
    sites: any[]
  ) => void;
  isLoggedIn: () => boolean;
  logout: () => void;
  getToken: () => string | null;
  updateSiteId: (newSiteId: number) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  authState: {
    user: undefined,
    token: undefined,
    countries: undefined,
    sites: undefined,
  },
  setLoggedInUser: () => {},
  isLoggedIn: () => false,
  logout: () => {},
  getToken: () => null,
  updateSiteId: () => {},
});

const useHook = () => {
  const [authState, setState] = useSessionStorage<IAuthState>(
    "__PAM_ADMIN_AUTH__",
    {
      user: undefined,
      token: undefined,
      countries: undefined,
      sites: undefined,
    }
  );

  let accessToken: string | null = authState.token ?? null;

  const updateState = (changes: Partial<IAuthState>) => {
    setState((prevState: IAuthState) => ({
      ...prevState,
      ...changes,
    }));
  };

  const setLoggedInUser = (
    user: any,
    token: string,
    countries: any[],
    sites: any[]
  ) => {
    accessToken = token;
    updateState({ user, token, countries, sites });
  };

  const updateSiteId = (newSiteId: number) => {
    setState((prevState: IAuthState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        siteid: newSiteId,
      },
    }));
  };

  const isLoggedIn = useCallback(() => {
    return authState.user != null && accessToken != null;
  }, [authState.user]);

  const logout = () => {
    accessToken = null;
    updateState({
      user: undefined,
      token: undefined,
      countries: undefined,
      sites: undefined,
    });
  };

  const roleId = authState.user?.roleid;

  const restrictedRoles =
    roleId === 1 || roleId === 5 || roleId === 7 || roleId === 10;

  const getToken: any = () => accessToken;

  return {
    authState,
    setLoggedInUser,
    isLoggedIn,
    logout,
    getToken,
    updateSiteId,
    roleId,
    restrictedRoles,
  };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
