import { useCallback } from "react";
import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import { IAuthState } from "@/types/auth";

let accessToken: string | null = null;

const useHook = () => {
  const [authState, setState] = useSessionStorage<IAuthState>(
    "__PAM_ADMIN_AUTH__",
    { user: undefined, token: undefined }
  );

  accessToken = authState.token ?? null;

  const setLoggedInUser = (user: any, token: string) => {
    accessToken = token;
    updateState({ user, token });
  };

  const updateState = (changes: Partial<IAuthState>) => {
    setState((prevState) => ({
      ...prevState,
      ...changes,
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
    });
  };

  const getToken = () => accessToken;

  return {
    authState,
    setLoggedInUser,
    isLoggedIn,
    logout,
    getToken,
  };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
