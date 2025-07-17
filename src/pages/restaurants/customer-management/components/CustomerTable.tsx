import { Image, Table, TableColumnsType, type TableProps } from 'antd';

import TableComponent from '@/components/ui/table-component';
import { formatDateTime } from '@/components/utils/date';
import { RestaurantEvenSubItem, RestaurantEventItem } from '@/types';

import { dataRestaurantDetail } from '../../mockData';

// Interface for table data
interface CustomerTableProps<T = any> {
  data: any[];
  loading?: boolean;
  filterCondition: T;
  setFilterCondition?: (condition: T) => void;
  totalItem: number;
}

const CustomerTable: React.FC<CustomerTableProps> = (props) => {
  const {
    data = [],
    loading = false,
    filterCondition,
    setFilterCondition = () => {},
    totalItem = 0,
  } = props;

  const columns: TableProps<RestaurantEventItem>['columns'] = [
    {
      title: 'Customer Id',
      dataIndex: 'person_external_id',
      key: 'person_external_id',
      width: 120,
    },
    {
      title: 'Start picture',
      dataIndex: 'image_start',
      key: 'image_start',
      width: 120,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" />;
      },
    },
    {
      title: 'End picture',
      dataIndex: 'image_end',
      key: 'image_end',
      width: 120,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" />;
      },
    },
    {
      title: 'Start time',
      dataIndex: 'event_start',
      key: 'event_start',
      width: 80,
      render: (value: string) => {
        return <>{formatDateTime(value)}</>;
      },
    },
    {
      title: 'End time',
      dataIndex: 'event_end',
      key: 'event_end',
      width: 80,
      render: (value: string) => {
        return <>{formatDateTime(value)}</>;
      },
    },
  ];

  const expandColumns: TableColumnsType<RestaurantEvenSubItem> = [
    { title: 'Camera id', dataIndex: 'camera_id', key: 'camera_id', width: 120 },
    {
      title: 'Start picture',
      dataIndex: 'image_start',
      key: 'image_start',
      width: 120,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" />;
      },
    },
    {
      title: 'End picture',
      dataIndex: 'image_end',
      key: 'image_end',
      width: 120,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" />;
      },
    },
    {
      title: 'Start time',
      dataIndex: 'event_start',
      key: 'event_start',
      width: 80,
      render: (value: string) => {
        return <>{formatDateTime(value)}</>;
      },
    },
    {
      title: 'End time',
      dataIndex: 'event_end',
      key: 'event_end',
      width: 80,
      render: (value: string) => {
        return <>{formatDateTime(value)}</>;
      },
    },
  ];

  const expandedRowRender = (_: RestaurantEvenSubItem, index: number) => {
    const dataSubEvent = dataRestaurantDetail?.events?.[index]?.sub_events;
    return (
      <Table<RestaurantEvenSubItem>
        columns={expandColumns}
        dataSource={dataSubEvent}
        pagination={false}
      />
    );
  };

  return (
    <>
      <TableComponent
        columns={columns}
        dataSource={dataRestaurantDetail?.events}
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        loading={loading}
        totalItem={totalItem}
        showPagination
        expandableConfig={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        rowKey="person_external_id"
      />
    </>
  );
};

export default CustomerTable;
