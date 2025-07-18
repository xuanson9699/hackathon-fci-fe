import { CloseOutlined } from '@ant-design/icons';
import { Progress, Button } from 'antd';
import { styled } from 'styled-components';

import { UploadItem } from '@/types';

type Props = {
  queue: UploadItem[];
  onClose: () => void;
};

const UploadBox = ({ queue, onClose }: Props) => {
  const handleShowStatus = (item: UploadItem) => {
    if (item.status === 'error') {
      return 'exception';
    }
    if (item.status === 'done') {
      return 'success';
    }
    return 'active';
  };
  if (queue.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white border shadow-lg rounded z-50 h-96">
      <div className="flex justify-between items-center mb-2 bg-blue-500 p-3">
        <span className="font-semibold text-white">Upload file</span>
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onClose}
          className="text-white"
        />
      </div>
      <div className="max-h-60 overflow-y-auto space-y-3 py-2 px-4">
        {queue.map((item) => (
          <StyledItemFile key={item.id} className="flex items-center justify-between p-1">
            <div className="truncate text-sm">{item.file.name}</div>
            <Progress
              percent={item.progress}
              type="circle"
              status={handleShowStatus(item)}
              showInfo={true}
              size={26}
            />
          </StyledItemFile>
        ))}
      </div>
    </div>
  );
};

const StyledItemFile = styled.div`
  border-bottom: 1px solid gainsboro;
`;

export default UploadBox;
