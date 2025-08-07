import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';

import { GET_ALL_CENTER_QUERY_KEY } from '@/components/constants';
import useCenterService from '@/services/center.service';

import CenterTable from './components/CenterTable';
import FilterBar from './components/FilterBar';

export type FilterConditionType = {
  page: number;
  per_page: number;
  search_term: string;
  start_time?: string;
  end_time?: string;
  order?: string;
  sort_by?: string;
};

const defaultFilter = {
  page: 1,
  per_page: 10,
  search_term: '',
  order: undefined,
  sort_by: undefined,
};

const Centers = () => {
  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
    ...queryString.parse(location.search),
  });

  const { getAll } = useCenterService();

  const { data, isLoading } = useQuery({
    queryKey: [GET_ALL_CENTER_QUERY_KEY, filterCondition],
    queryFn: () => getAll(filterCondition),
    keepPreviousData: true,
  });

  return (
    <>
      <header className="shrink-0 flex items-center shadow h-14 px-20 sticky z-50 bg-white top-0">
        <Breadcrumb
          items={[
            {
              title: <span className="text-xl font-semibold">Center</span>,
            },
          ]}
        />
      </header>
      <div className="p-20 py-5 bg-gray-100 h-full flex flex-col gap-4">
        <FilterBar
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          defaultFilter={defaultFilter}
        />
        <CenterTable
          data={data?.data ?? []}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          totalItem={data?.meta?.total ?? 0}
        />
      </div>
    </>
  );
};

export default Centers;
