import { Image, Table, TableColumnsType, type TableProps } from 'antd';
import { styled } from 'styled-components';

import { DATETIME_FORMAT_DDMMYYYY_HHMMSS } from '@/components/constants';
import TableComponent from '@/components/ui/table-component';
import { formatDateTime } from '@/components/utils/date';
import { RestaurantDetailResponse, RestaurantEvenSubItem, RestaurantEventItem } from '@/types';

import { formatDuration } from '../helper';

// Interface for table data
interface CustomerTableProps<T = any> {
  dataSource?: RestaurantEventItem[];
  loading?: boolean;
  filterCondition: T;
  setFilterCondition?: (condition: T) => void;
  total: number;
}

const CustomerTable: React.FC<CustomerTableProps> = (props) => {
  const {
    dataSource,
    loading = false,
    filterCondition,
    setFilterCondition = () => {},
    total,
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
      width: 100,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" loading="lazy" />;
      },
    },
    {
      title: 'End picture',
      dataIndex: 'image_end',
      key: 'image_end',
      width: 100,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" loading="lazy" />;
      },
    },
    {
      title: 'Start time',
      dataIndex: 'event_start',
      key: 'event_start',
      width: 80,
      render: (value: string) => {
        return (
          <>
            {formatDateTime({
              date: value,
              format: DATETIME_FORMAT_DDMMYYYY_HHMMSS,
              keepUtc: true,
            })}
          </>
        );
      },
    },
    {
      title: 'End time',
      dataIndex: 'event_end',
      key: 'event_end',
      width: 80,
      render: (value: string) => {
        return (
          <>
            {formatDateTime({
              date: value,
              format: DATETIME_FORMAT_DDMMYYYY_HHMMSS,
              keepUtc: true,
            })}
          </>
        );
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration_seconds',
      key: 'duration_seconds',
      width: 120,
      render: (value: number) => {
        return <>{formatDuration(value)}</>;
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
        return <Image src={value} alt="" className="!w-20 object-cover" loading="lazy" />;
      },
    },
    {
      title: 'End picture',
      dataIndex: 'image_end',
      key: 'image_end',
      width: 120,
      render: (value: string) => {
        return <Image src={value} alt="" className="!w-20 object-cover" loading="lazy" />;
      },
    },
    {
      title: 'Start time',
      dataIndex: 'event_start',
      key: 'event_start',
      width: 80,
      render: (value: string) => {
        return (
          <>
            {formatDateTime({
              date: value,
              format: DATETIME_FORMAT_DDMMYYYY_HHMMSS,
              keepUtc: true,
            })}
          </>
        );
      },
    },
    {
      title: 'End time',
      dataIndex: 'event_end',
      key: 'event_end',
      width: 80,
      render: (value: string) => {
        return (
          <>
            {formatDateTime({
              date: value,
              format: DATETIME_FORMAT_DDMMYYYY_HHMMSS,
              keepUtc: true,
            })}
          </>
        );
      },
    },
  ];

  const expandedRowRender = (_: RestaurantEvenSubItem, index: number) => {
    const dataSubEvent = dataSource?.[index]?.sub_events;
    return (
      <StyledExpandeTable<any>
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
        dataSource={dataSource}
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        loading={loading}
        totalItem={total}
        showPagination
        expandableConfig={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        rowKey="person_external_id"
        scrollY="60vh"
      />
    </>
  );
};

export default CustomerTable;

const StyledExpandeTable = styled(Table)`
  .ant-table-row {
    background-color: #ecf1f5;
  }
  .ant-table-row:hover {
    background-color: #ecf1f5 !important;
  }
`;
