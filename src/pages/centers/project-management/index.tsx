import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';

import { GET_CENTER_DETAIL_QUERY_KEY } from '@/components/constants';
import useCenterService from '@/services/center.service';

import FilterProjectBar from './components/FilterProjectBar';
import ProjectTable from './components/ProjectTable';

export type FilterConditionType = {
  page: number;
  per_page: number;
  project_name: string;
};

const defaultFilter = {
  page: 1,
  per_page: 10,
  project_name: '',
};

const ProjectManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
    ...queryString.parse(location.search),
  });

  const { getDetail } = useCenterService();

  const { data, isFetching } = useQuery({
    queryKey: [GET_CENTER_DETAIL_QUERY_KEY, id, filterCondition],
    queryFn: () => getDetail(id ?? '', filterCondition),
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
                  Center
                </a>
              ),
            },
            {
              title: <span className="text-xl font-semibold">Project List</span>,
            },
          ]}
        />
      </header>

      <div className="flex gap-4 p-20 py-5 bg-gray-100 h-full flex-col">
        <FilterProjectBar
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          defaultFilter={defaultFilter}
        />

        <ProjectTable
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

export default ProjectManagement;
