import { useState } from 'react';

import {
  VideoCameraOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Drawer, Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { GET_VIDEOS_UPLOADED_QUERY_KEY, StatusVideoUploadedEnum } from '@/components/constants';
import PaginationControl from '@/components/ui/pagination-control';
import useRestaurantService from '@/services/restaurant.service';

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
    refetchInterval: 10000,
  });

  const handleShowStatusIcon = (status: string) => {
    if (status === StatusVideoUploadedEnum.FAILED) {
      return <InfoCircleOutlined className="text-red-500" />;
    }
    if (status === StatusVideoUploadedEnum.SUCCSESS) {
      return <CheckCircleOutlined className="text-green-500" />;
    }
    return <SyncOutlined className="text-blue-500" />;
  };

  return (
    <Drawer open onClose={toggleCollapsed} width={'35%'} title="Uploaded File">
      <Spin spinning={isLoading}>
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
          <PaginationControl
            filterCondition={filterCondition}
            setFilterCondition={setFilterCondition}
            totalItem={data?.meta?.total}
          />
        </div>
      </Spin>
    </Drawer>
  );
};
export default HistoryVideoUpload;
