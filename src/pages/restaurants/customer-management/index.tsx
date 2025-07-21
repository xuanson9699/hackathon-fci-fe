import { useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Tooltip } from 'antd';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';

import { GET_RESTAURANT_DETAIL_QUERY_KEY } from '@/components/constants';
import ButtonBase from '@/components/ui/button-base';
import useRestaurantService from '@/services/restaurant.service';
import { UploadItem } from '@/types';

import CustomerTable from './components/CustomerTable';
import FilterCustomerBar from './components/FilterCustomerBar';
import HistoryVideoUpload from './components/HistoryVideoUploaded';
import UploadProgressDrawer from './components/UploadProgressBox';

export type FilterConditionType = {
  page: number;
  per_page: number;
  person_external_id: string;
  start_time?: string;
  end_time?: string;
  order?: string;
  sort_by?: string;
};

const defaultFilter = {
  page: 1,
  per_page: 10,
  person_external_id: '',
  start_time: undefined,
  end_time: undefined,
  order: undefined,
  sort_by: undefined,
};

const CustommerManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [showUploadDrawer, setShowUploadDrawer] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
    ...queryString.parse(location.search),
  });

  const { getDetail } = useRestaurantService();

  const { data, isLoading } = useQuery({
    queryKey: [GET_RESTAURANT_DETAIL_QUERY_KEY, id, filterCondition],
    queryFn: () => getDetail(id ?? '', filterCondition),
    keepPreviousData: true,
    refetchInterval: 10000,
  });

  const toggleCollapsed = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="shrink-0 flex items-center shadow h-14 px-20 sticky z-50 bg-white top-0">
        <Breadcrumb
          items={[
            {
              title: (
                <a className="text-xl font-semibold" href="#" onClick={() => navigate(-1)}>
                  Restaurant
                </a>
              ),
            },
            {
              title: <span className="text-xl font-semibold">Customer List</span>,
            },
          ]}
        />
      </header>

      <div className="flex gap-4 p-20 py-5 bg-gray-100 h-full flex-col">
        <FilterCustomerBar
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          defaultFilter={defaultFilter}
          setUploadQueue={setUploadQueue}
          uploadQueue={uploadQueue}
          setShowUploadDrawer={setShowUploadDrawer}
        />
        <div>
          {!isOpen ? (
            <Tooltip title="Show videos uploaded">
              <ButtonBase onClick={toggleCollapsed}>
                List Video
                <MenuUnfoldOutlined />
              </ButtonBase>
            </Tooltip>
          ) : (
            <ButtonBase onClick={toggleCollapsed}>
              List Video
              <MenuFoldOutlined />
            </ButtonBase>
          )}
        </div>

        <CustomerTable
          data={data}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          loading={isLoading}
        />
      </div>
      {showUploadDrawer && (
        <UploadProgressDrawer queue={uploadQueue} onClose={() => setShowUploadDrawer(false)} />
      )}
      {isOpen && <HistoryVideoUpload toggleCollapsed={toggleCollapsed} />}
    </>
  );
};

export default CustommerManagement;
