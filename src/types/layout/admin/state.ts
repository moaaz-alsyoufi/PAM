import { ILayoutThemeMode } from "./theme";

export type ILayoutState = {
  theme: ILayoutThemeMode;
  leftbar: {
    hide: boolean;
    drawerOpen: boolean;
    dashboard: boolean;
  };

  companyId: number;
  siteId: number;
};
