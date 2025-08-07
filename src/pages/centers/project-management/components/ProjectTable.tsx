import { type TableProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { DATE_FORMAT_DDMMYYYY } from '@/components/constants';
import TableComponent from '@/components/ui/table-component';
import { formatDateTime } from '@/components/utils/date';

// Interface for table data
interface ProjectTableProps<T = any> {
  dataSource?: any[];
  loading?: boolean;
  filterCondition: T;
  setFilterCondition?: (condition: T) => void;
  total: number;
}

const ProjectTable: React.FC<ProjectTableProps> = (props) => {
  const {
    dataSource,
    loading = false,
    filterCondition,
    setFilterCondition = () => {},
    total,
  } = props;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Center',
      dataIndex: 'center_name',
      key: 'center_name',
      width: 120,
    },
    {
      title: 'Project name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 80,
      render: (value: string) => {
        return (
          <>
            {formatDateTime({
              date: value,
              format: DATE_FORMAT_DDMMYYYY,
              keepUtc: true,
            })}
          </>
        );
      },
    },
    {
      title: 'Members number',
      dataIndex: 'member_count',
      key: 'member_count',
      width: 120,
    },
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        loading={loading}
        totalItem={total}
        showPagination
        scrollY="60vh"
        handleDoubleRowClick={(record) => {
          navigate(`/center/${id}/project/${record?.id}/reference`);
        }}
      />
    </>
  );
};

export default ProjectTable;
