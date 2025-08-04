import { useState } from 'react';

import { CloseCircleOutlined, SyncOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Drawer, TableColumnsType } from 'antd';
import { useParams } from 'react-router-dom';

import {
  GET_VIDEOS_UPLOADED_QUERY_KEY,
  StatusVideoUploadedEnum,
  DATETIME_FORMAT_DDMMYYYY_HHMMSS,
} from '@/components/constants';
import TableComponent from '@/components/ui/table-component';
import { formatDateTime } from '@/components/utils/date';
import useRestaurantService from '@/services/restaurant.service';
import { Video } from '@/types';

type HistoryVideoUploadProps = {
  toggleCollapsed: () => void;
};

export type FilterType = {
  page: number;
  per_page: number;
};

const HistoryVideoUpload = ({ toggleCollapsed }: HistoryVideoUploadProps) => {
  const { id } = useParams<{ id: string }>();
  const { getVideosUploaded } = useRestaurantService();

  const defaultFilter = {
    page: 1,
    per_page: 10,
  };

  const [filterCondition, setFilterCondition] = useState<FilterType>({
    ...defaultFilter,
  });

  const { data, isLoading } = useQuery({
    queryKey: [GET_VIDEOS_UPLOADED_QUERY_KEY, id, filterCondition],
    queryFn: () => getVideosUploaded(id ?? '', filterCondition),
    keepPreviousData: true,
  });

  const handleShowStatusIcon = (status: string) => {
    if (status === StatusVideoUploadedEnum.FAILED) {
      return (
        <div className="flex gap-2 text-info_red rounded-full border border-info_red border-solid py-0.5 px-2 bg-red-100 w-fit">
          <CloseCircleOutlined />
          Error
        </div>
      );
    }
    if (status === StatusVideoUploadedEnum.SUCCESS) {
      return (
        <div className="flex gap-2 text-info_green rounded-full border border-info_green border-solid py-0.5 px-2 bg-green-100 w-fit">
          <CheckCircleOutlined />
          Succsess
        </div>
      );
    }
    return (
      <div className="flex gap-2 text-brand rounded-full border border-brand border-solid py-0.5 px-2 bg-blue-100 w-fit">
        <SyncOutlined />
        Processing
      </div>
    );
  };

  const columns: TableColumnsType<Video> = [
    { title: 'Camera id', dataIndex: 'camera_id', key: 'camera_id', width: 100 },
    { title: 'File name', dataIndex: 'filename', key: 'filename', width: 240 },
    {
      title: 'Uploaded at',
      dataIndex: 'uploaded_at',
      key: 'uploaded_at',
      width: 160,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 60,
      render: (value: string) => {
        return <>{handleShowStatusIcon(value)}</>;
      },
    },
  ];

  return (
    <Drawer open onClose={toggleCollapsed} width={'60%'} title="Uploaded File">
      <TableComponent
        columns={columns}
        dataSource={data?.videos}
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        loading={isLoading}
        totalItem={data?.meta?.total}
        showPagination
        scrollY="70vh"
        size="small"
      />
    </Drawer>
  );
};
export default HistoryVideoUpload;
