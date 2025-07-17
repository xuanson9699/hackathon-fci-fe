import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';
import { clsx } from 'clsx';

import ButtonBase from '../button-base';
import PageInput from '../PageInput';

const { Option } = Select;

interface PaginationProps<T extends object, F = any> {
  filterCondition?: F;
  setFilterCondition?: (condition: F) => void;
  totalItem?: number;
}

const PaginationControl = <T extends object>({
  filterCondition = {},
  setFilterCondition = () => {},
  totalItem = 0,
}: PaginationProps<T>) => {
  const startItem = (filterCondition.page - 1) * filterCondition.page_size + 1;
  const endItem = Math.min(filterCondition.page * filterCondition.page_size, totalItem);
  const totalPage = Math.ceil(totalItem / filterCondition.page_size);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div className="flex items-center gap-4 h-8">
        <span className="text-[16px] text-secondary">Rows per page</span>
        <Select
          value={filterCondition?.page_size}
          className="w-15 text-base bg-[white] rounded h-7 text-secondary"
          disabled={false}
          onChange={(value) => {
            setFilterCondition({
              ...filterCondition,
              page_size: value,
              page: 1,
            });
          }}
        >
          {[10, 20, 50, 100].map((size) => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
        <span className="text-secondary ml-2">
          {totalItem > 0 ? `${startItem}-${endItem} of ${totalItem} items` : '0 items'}
        </span>
      </div>
      <Space size={8}>
        <PageInput
          className="w-10 h-7 text-center border border-[#d9d9d9]"
          value={filterCondition.page}
          size="small"
          totalPage={totalPage}
          onChange={(value: number) => {
            setFilterCondition({ ...filterCondition, page: value });
          }}
        />
        <span className="text-secondary">of {totalPage} pages</span>
        <ButtonBase
          icon={<LeftOutlined />}
          disabled={filterCondition.page <= 1}
          onClick={() =>
            setFilterCondition({
              ...filterCondition,
              page: Math.max(1, filterCondition.page - 1),
            })
          }
          className={clsx(
            'flex items-center justify-center border border-surface_white rounded h-7 w-7 min-w-7 p-0',
            filterCondition.page <= 1 ? 'text-surface_white' : 'text-secondary',
          )}
        />
        <ButtonBase
          icon={<RightOutlined />}
          disabled={filterCondition.page >= totalPage}
          onClick={() =>
            setFilterCondition({
              ...filterCondition,
              page: ++filterCondition.page,
            })
          }
          className={clsx(
            'flex items-center justify-center border border-surface_white rounded h-7 w-7 min-w-7 p-0',
            filterCondition.page >= totalPage ? 'text-surface_white' : 'text-secondary',
          )}
        />
      </Space>
    </div>
  );
};

export default PaginationControl;
