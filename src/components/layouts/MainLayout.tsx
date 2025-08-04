import { memo, useEffect } from 'react';

import { useNavigate, useOutlet } from 'react-router-dom';

import { ACCESS_TOKEN_KEY } from '../constants';
import VerticalNavigation from './VerticalNavigation';

const MainLayout = (): JSX.Element => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);

  // useEffect(() => {
  //   if (!access_token) {
  //     navigate('/login');
  //   }
  // }, [navigate, access_token]);

  return (
    <div className="z-10 fixed inset-0 h-full w-full flex">
      <VerticalNavigation />
      <main className="h-screen flex flex-col flex-auto min-h-full w-2 min-w-0 relative z-30 shrink-0 overflow-y-auto overflow-x-hidden bg-gray-100 main-container">
        {outlet}
      </main>
    </div>
  );
};

export default memo(MainLayout);
