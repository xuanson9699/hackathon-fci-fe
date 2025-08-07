import { lazy } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import Centers from '@/pages/centers';
import ProjectManagement from '@/pages/centers/project-management';
import ReferencePage from '@/pages/centers/reference';
import MemberManagement from '@/pages/members';
import { RouteExtends } from '@/types';

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
            element: <Centers />,
          },
          {
            path: ':id/project',
            children: [
              {
                index: true,
                element: <ProjectManagement />,
              },
              {
                path: ':projectId/reference',
                element: <ReferencePage />,
              },
            ],
          },
        ],
      },
      {
        path: 'member',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <MemberManagement />,
          },
        ],
      },
    ],
  },
];

export default routes;
