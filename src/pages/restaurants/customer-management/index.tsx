import { useEffect, useRef, useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Tooltip } from 'antd';
import { isEqual } from 'lodash-es';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';

import { GET_RESTAURANT_DETAIL_QUERY_KEY } from '@/components/constants';
import ButtonBase from '@/components/ui/button-base';
import useRestaurantService from '@/services/restaurant.service';
import { RestaurantEventItem, UploadItem } from '@/types';

import CustomerTable from './components/CustomerTable';
import FilterCustomerBar from './components/FilterCustomerBar';
import HistoryVideoUpload from './components/HistoryVideoUploaded';
import UploadProgressDrawer from './components/UploadProgressBox';
import { isSameDataSource } from './helper';

export type FilterConditionType = {
  page: number;
  per_page: number;
  person_external_id: string;
  start_time?: string;
  end_time?: string;
  order?: string;
  sort_by?: string;
  duration?: string | number | null;
};

const defaultFilter = {
  page: 1,
  per_page: 10,
  person_external_id: '',
  start_time: undefined,
  end_time: undefined,
  order: undefined,
  sort_by: undefined,
  duration: 0,
};

const CustommerManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [showUploadDrawer, setShowUploadDrawer] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [dataSource, setDataSource] = useState<RestaurantEventItem[]>([]);

  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
    ...queryString.parse(location.search),
  });

  const filterRef = useRef({});

  const { getDetail } = useRestaurantService();

  const { data } = useQuery({
    queryKey: [GET_RESTAURANT_DETAIL_QUERY_KEY, id, filterCondition],
    queryFn: () => getDetail(id ?? '', filterCondition),
    keepPreviousData: true,
    refetchInterval: 10000,
    onSuccess: (data) => {
      if (!isSameDataSource(dataSource, data?.events)) {
        setDataSource(data?.events);
      }
      if (!isEqual(filterRef.current, filterCondition)) {
        filterRef.current = filterCondition;
        setIsFilterLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!isEqual(filterRef.current, filterCondition)) {
      setIsFilterLoading(true);
    }
  }, [filterCondition]);

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
        <div className="flex gap-2 items-center justify-between">
          {/* <ButtonBase> */}
          <div>
            Customer total:{' '}
            <span className="text-secondary font-semibold">{data?.meta?.total}</span>
          </div>
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
          {/* </ButtonBase> */}
        </div>

        <CustomerTable
          dataSource={dataSource}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          loading={isFilterLoading}
          total={data?.meta?.total ?? 0}
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
