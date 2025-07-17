import { lazy } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import { RouteExtends } from '@/types';

// Lazy load components
const RestaurantsModule = lazy(() => import('@/pages/restaurants'));
const CustomerManagementModule = lazy(() => import('@/pages/restaurants/customer-management'));
const LoginModule = lazy(() => import('@/pages/login'));

const routes: RouteExtends[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="restaurant" replace />,
      },
      {
        path: 'restaurant',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <RestaurantsModule />,
          },
          {
            path: ':id',
            element: <CustomerManagementModule />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginModule />,
  },
];

export default routes;
