import React, { useCallback } from "react";
import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import { IUser } from "@/types/apps/admintools/users";
import { IAuthState } from "@/types/auth/state";

interface AuthContextType {
  authState: IAuthState;
  setLoggedInUser: (
    user: IUser,
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
    user: IUser,
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

  const getToken: any = () => accessToken;

  return {
    authState,
    setLoggedInUser,
    isLoggedIn,
    logout,
    getToken,
    updateSiteId,
  };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
