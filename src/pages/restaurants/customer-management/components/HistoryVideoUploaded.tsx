import { useState } from 'react';

import { InfoCircleOutlined, SyncOutlined, CheckCircleOutlined } from '@ant-design/icons';
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
      return <InfoCircleOutlined className="text-info_red" />;
    }
    if (status === StatusVideoUploadedEnum.SUCCSESS) {
      return <CheckCircleOutlined className="text-info_green" />;
    }
    return <SyncOutlined className="text-brand" />;
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
        return <>{formatDateTime(value, DATETIME_FORMAT_DDMMYYYY_HHMMSS)}</>;
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
    <Drawer open onClose={toggleCollapsed} width={'50%'} title="Uploaded File">
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
      {/* <Spin spinning={isLoading}>
        <div className="flex flex-col gap-4">
          <div>
            {data?.videos?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-2 b-bottom flex justify-between items-center cursor-pointer text-secondary"
                >
                  <VideoCameraOutlined />
                  <div className="ml-2 max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.filename}
                  </div>
                  {handleShowStatusIcon(item.status)}
                </div>
              );
            })}
          </div>
          {!isLoading && (
            <PaginationControl
              filterCondition={filterCondition}
              setFilterCondition={setFilterCondition}
              totalItem={data?.meta?.total}
            />
          )}
        </div>
      </Spin> */}
    </Drawer>
  );
};
export default HistoryVideoUpload;
