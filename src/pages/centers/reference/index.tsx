import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, TableProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { GET_REFERENCE_BY_PROJECT_QUERY_KEY } from '@/components/constants';
import TableComponent from '@/components/ui/table-component';
import useCenterService from '@/services/center.service';

import FilterReferenceBar from './FilterReferenceBar';

export type FilterConditionType = {
  page: number;
  per_page: number;
  search_term: string;
};

const defaultFilter = {
  page: 1,
  per_page: 10,
  search_term: '',
};

const ReferencePage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ id: string; projectId: string }>();

  const [filterCondition, setFilterCondition] = useState<FilterConditionType>({
    ...defaultFilter,
  });

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Project name',
      dataIndex: 'project_name',
      key: 'project_name',
      width: 120,
    },
    {
      title: 'Reference id',
      dataIndex: 'page_id',
      key: 'page_id',
      width: 120,
    },
    {
      title: 'Title',
      dataIndex: 'page_title',
      key: 'page_title',
      width: 120,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
  ];

  const { getReferenceByProject } = useCenterService();

  const { data, isFetching } = useQuery({
    queryKey: [GET_REFERENCE_BY_PROJECT_QUERY_KEY, projectId, filterCondition],
    queryFn: () => getReferenceByProject(projectId ?? '', filterCondition),
    keepPreviousData: true,
  });

  return (
    <>
      <header className="shrink-0 flex items-center shadow h-14 px-20 sticky z-50 bg-white top-0">
        <Breadcrumb
          items={[
            {
              title: (
                <a className="text-xl font-semibold" href="#">
                  Center
                </a>
              ),
            },
            {
              title: (
                <a className="text-xl font-semibold" href="#" onClick={() => navigate(-1)}>
                  Project List
                </a>
              ),
            },
            {
              title: <span className="text-xl font-semibold">Reference</span>,
            },
          ]}
        />
      </header>
      <div className="flex gap-4 p-20 py-5 bg-gray-100 h-full flex-col">
        <FilterReferenceBar
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
        <div>
          <TableComponent
            columns={columns}
            dataSource={data?.data ?? []}
            loading={isFetching}
            totalItem={data?.total ?? 0}
            showPagination
            scrollY="60vh"
            filterCondition={filterCondition}
            setFilterCondition={setFilterCondition}
          />
        </div>
      </div>
    </>
  );
};

export default ReferencePage;
