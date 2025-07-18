import { memo, useMemo } from 'react';

import useNavigationStore from '@/store/navigation.slice';

import SidebarMenu from './SideBarMenu';
import useMediaQuery from '../hooks/useMediaQuery';

const NAV_OPEN_WIDTH = 16;
const NAV_CLOSE_WIDTH = 5.2;
const NAV_CLOSE_WIDTH_v2 = 0;

const VerticalNavigation = (): JSX.Element => {
  const { isNavOpen } = useNavigationStore();
  const isBreak = useMediaQuery('lg');

  const navWidth = useMemo(() => {
    if (isBreak) return NAV_CLOSE_WIDTH_v2;
    return isNavOpen ? NAV_OPEN_WIDTH : NAV_CLOSE_WIDTH;
  }, [isNavOpen, isBreak]);

  return (
    <aside
      style={{ width: `${navWidth}rem` }}
      className="sticky top-0 w-full h-screen z-20 shadow-xl overflow-auto shrink-0"
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0" style={{ width: `${navWidth}rem` }}>
          <SidebarMenu />
        </div>
      </div>
    </aside>
  );
};

export default memo(VerticalNavigation);
