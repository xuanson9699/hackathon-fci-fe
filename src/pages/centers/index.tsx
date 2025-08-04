import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';

import { GET_ALL_RESTAURANT_QUERY_KEY } from '@/components/constants';
import centerDatas from '@/components/mockData.ts/centerData';
import useRestaurantService from '@/services/restaurant.service';

import FilterBar from './components/FilterBar';
import RestaurantTable from './components/RestaurantTable';

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

  return (
    <>
      <header className="shrink-0 flex items-center shadow h-14 px-20 sticky z-50 bg-white top-0">
        <Breadcrumb
          items={[
            {
              title: <span className="text-xl font-semibold">Restaurant</span>,
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
        <RestaurantTable
          data={centerDatas}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          totalItem={10}
        />
      </div>
    </>
  );
};

export default Centers;
