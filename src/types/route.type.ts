import { RouteObject } from "react-router-dom";

export type RouteExtends = Omit<RouteObject, "children"> & {
  canGuard?: boolean;
  children?: RouteExtends[];
  key?: string;
};
