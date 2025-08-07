import { type TableProps } from 'antd';

import { DATE_FORMAT_DDMMYYYY } from '@/components/constants';
import TableComponent from '@/components/ui/table-component';
import { formatDateTime } from '@/components/utils/date';
import { RestaurantEventItem } from '@/types';

// Interface for table data
interface MemberTableProps<T = any> {
  dataSource?: RestaurantEventItem[];
  loading?: boolean;
  filterCondition: T;
  setFilterCondition?: (condition: T) => void;
  total: number;
}

const MemberTable: React.FC<MemberTableProps> = (props) => {
  const {
    dataSource,
    loading = false,
    filterCondition,
    setFilterCondition = () => {},
    total,
  } = props;

  const columns: TableProps<RestaurantEventItem>['columns'] = [
    {
      title: 'Center',
      dataIndex: 'center_name',
      key: 'center_name',
      width: 120,
    },
    {
      title: 'User name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      width: 200,
    },
    {
      title: 'Project joined',
      dataIndex: 'project_joined',
      key: 'project_joined',
      width: 120,
      render: (value: string[]) => {
        return <>{value.join(', ')}</>;
      },
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
      />
    </>
  );
};

export default MemberTable;
