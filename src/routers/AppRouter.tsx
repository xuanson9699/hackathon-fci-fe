import { memo, Suspense } from "react";

import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import routes from "./route-define";
import RouteLoading from "./RouteLoading";

interface RouteDefine {
  path?: string;
  element?: React.ReactNode;
  children?: RouteDefine[];
  canGuard?: boolean;
}

const processChildRoutes = (childRoutes: RouteDefine[]): RouteObject[] => {
  return childRoutes.map((route) => {
    const { element, children, ...rest } = route;

    const wrappedElement = (
      <Suspense fallback={<RouteLoading />}>
        {element ?? (children ? <Outlet /> : null)}
      </Suspense>
    );

    return {
      ...rest,
      element: wrappedElement,
      ...(children ? { children: processChildRoutes(children) } : {}),
    } as RouteObject;
  });
};

const router = createBrowserRouter([...processChildRoutes(routes)]);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default memo(AppRouter);
