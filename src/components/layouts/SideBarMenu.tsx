import { useMemo, useState } from 'react';

import {
  BellOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Divider, Dropdown, Menu } from 'antd';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { getPublicImageUrl } from '@/components/utils';
import useNavigationStore from '@/store/navigation.slice';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number] & { path?: string };

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { t } = useTranslation();

  const items: MenuItem[] = [
    {
      key: '/center',
      icon: <ShopOutlined />,
      label: 'Centers',
    },
    {
      key: '/member',
      icon: <UsergroupAddOutlined />,
      label: 'Members',
    },
  ];

  const { setToggleNav, isNavOpen } = useNavigationStore();
  const [visible, setVisible] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setToggleNav();
  };

  const selectedKey = useMemo(() => {
    return items
      .map((item) => item!.key as string)
      .sort((a, b) => b.length - a.length)
      .find((key) => location.pathname.startsWith(key));
  }, [location.pathname]);

  const bottomMenuItems = [
    {
      key: 'support',
      icon: <QuestionCircleOutlined />,
      label: 'Support',
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: (
        <>
          Notifications
          <Badge
            count={12}
            style={{
              backgroundColor: '#ff4d4f',
              marginLeft: '10px',
            }}
          />
        </>
      ),
    },
  ];

  const listDropDown = [
    { label: 'Logout', key: 'logout', icon: <LogoutOutlined className="!text-sm" /> },
  ];

  const onOpenChange = (vis: boolean) => {
    setVisible(vis);
  };

  const handleLogOut = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen w-full bg-[#072A4A] text-white flex flex-col">
      {/* Logo */}
      <div className=" p-2 h-[80px] flex items-center justify-center text-lg font-bold border-b border-white/10">
        {isNavOpen && (
          <img className="ml-2 mr-14 w-32" src={getPublicImageUrl('camera-ai-logo.png')} alt="" />
        )}

        {!isNavOpen ? (
          <MenuUnfoldOutlined onClick={toggleCollapsed} />
        ) : (
          <MenuFoldOutlined onClick={toggleCollapsed} />
        )}
      </div>

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} className="m-0" />
      <div className={clsx('flex-1 ', isNavOpen && 'p-4')}>
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={!isNavOpen}
          className="bg-[#072A4A] text-white"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={items}
          onClick={(e) => {
            navigate(`${e.key}`);
          }}
        />
      </div>

      <div className={clsx('', isNavOpen && 'p-4 pb-0')}>
        <Menu
          mode="inline"
          theme="dark"
          className="bg-[#072A4A] text-white"
          selectable={false}
          inlineCollapsed={!isNavOpen}
          items={bottomMenuItems}
        />
      </div>
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} className="m-0" />
      <div
        className={clsx(
          'h-20  flex items-center justify-center',
          !isNavOpen && 'justify-center ml-0',
        )}
      >
        <Dropdown
          getPopupContainer={(trigger) => trigger.parentElement!}
          menu={{
            items: listDropDown.map(
              (lang: { label: string; key: string; icon: React.ReactNode }) => ({
                icon: lang.icon,
                label: <span className="capitalize text-slate-500">{isNavOpen && lang.label}</span>,
                className: 'flex items-center hover:!bg-stroke_st2 !text-base',
                key: lang.key,
                onClick: handleLogOut,
              }),
            ),
          }}
          trigger={['click']}
          open={visible}
          placement="bottom"
          onOpenChange={onOpenChange}
        >
          <div className="cursor-pointer flex items-center gap-2">
            <Avatar size="default" icon={<UserOutlined />} className="bg-gray-500" />
            {isNavOpen && (
              <div>
                <div>Phuong Nguyen</div>
              </div>
            )}
            <CaretDownOutlined className="text-xs" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default SidebarMenu;
