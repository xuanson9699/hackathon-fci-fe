import { lazy } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import { RouteExtends } from '@/types';

// Lazy load components
const CentersModule = lazy(() => import('@/pages/centers'));
const ProjectManagementModule = lazy(() => import('@/pages/centers/project-management'));

const routes: RouteExtends[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="center" replace />,
      },
      {
        path: 'center',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <CentersModule />,
          },
          {
            path: ':id',
            element: <ProjectManagementModule />,
          },
        ],
      },
    ],
  },
  // {
  //   path: 'login',
  //   element: <LoginModule />,
  // },
];

export default routes;
