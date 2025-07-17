import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';

import { GET_RESTAURANT_DETAIL_QUERY_KEY } from '@/components/constants';
import useRestaurantService from '@/services/restaurant.service';
import { UploadItem } from '@/types';

import CustomerTable from './components/CustomerTable';
import FilterCustomerBar from './components/FilterCustomerBar';
import UploadProgressDrawer from './components/UploadProgressBox';

export type FilterConditionType = {
  page: number;
  page_size: number;
  search_term: string;
  start_time?: string;
  end_time?: string;
  order?: string;
  sort_by?: string;
};

const defaultFilter = {
  page: 1,
  page_size: 10,
  search_term: '',
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

  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
    ...queryString.parse(location.search),
  });

  const { getDetail } = useRestaurantService();

  const { data, isLoading } = useQuery({
    queryKey: [GET_RESTAURANT_DETAIL_QUERY_KEY, id],
    queryFn: () => getDetail(id ?? ''),
    keepPreviousData: true,
  });

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
      <div className="p-20 py-5 bg-gray-100 h-full flex flex-col gap-4">
        <FilterCustomerBar
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          defaultFilter={defaultFilter}
          setUploadQueue={setUploadQueue}
          uploadQueue={uploadQueue}
          setShowUploadDrawer={setShowUploadDrawer}
        />
        <CustomerTable
          data={[{ id: '1' }]}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          totalItem={1}
        />
      </div>
      {showUploadDrawer && (
        <UploadProgressDrawer queue={uploadQueue} onClose={() => setShowUploadDrawer(false)} />
      )}
    </>
  );
};

export default CustommerManagement;
