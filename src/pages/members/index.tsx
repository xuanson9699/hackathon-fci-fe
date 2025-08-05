import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';

import { GET_USER_LIST_QUERY_KEY } from '@/components/constants';
import useCenterService from '@/services/center.service';

import FilterMemberBar from './components/FilterMemberBar';
import MemberTable from './components/MemberTable';

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

const MemberManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
    ...queryString.parse(location.search),
  });

  const { getMemberList } = useCenterService();

  const { data, isFetching } = useQuery({
    queryKey: [GET_USER_LIST_QUERY_KEY, filterCondition],
    queryFn: () => getMemberList(filterCondition),
    keepPreviousData: true,
  });

  console.log('data', data);

  return (
    <>
      <header className="shrink-0 flex items-center shadow h-14 px-20 sticky z-50 bg-white top-0">
        <Breadcrumb
          items={[
            {
              title: <span className="text-xl font-semibold">Member</span>,
            },
          ]}
        />
      </header>

      <div className="flex gap-4 p-20 py-5 bg-gray-100 h-full flex-col">
        <FilterMemberBar
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          defaultFilter={defaultFilter}
        />

        <MemberTable
          dataSource={data?.data ?? []}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          loading={isFetching}
          total={data?.meta?.total ?? 0}
        />
      </div>
    </>
  );
};

export default MemberManagement;
