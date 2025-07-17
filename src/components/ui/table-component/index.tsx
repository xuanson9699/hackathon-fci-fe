import { useState } from 'react';

import { Checkbox, Table } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { createStyles } from 'antd-style';

import PaginationControl from '../pagination-control';

import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface TableComponentProps<T extends object, F = any> {
  columns: ColumnsType<T>;
  handleDoubleRowClick?: (record: T) => void;
  loading?: boolean;
  dataSource?: T[];
  rowKey?: string;
  filterCondition?: F;
  setFilterCondition?: (condition: F) => void;
  showPagination?: boolean;
  totalItem?: number;
  showRowSelection?: boolean;
  size?: SizeType;
  className?: string;
  scrollX?: number | string;
  scrollY?: number | string;
  summary?: TableProps<T>['summary'];
  rowClassName?: (record: T, index?: number) => string;
  expandableConfig?: TableProps<T>['expandable'];
}

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table-body,
    .ant-table-content {
      scrollbar-width: thin;
      scrollbar-color: #eaeaea transparent;
      scrollbar-gutter: stable;
    }
  `,
}));

const TableComponent = <T extends object>({
  columns,
  handleDoubleRowClick = () => {},
  dataSource = [],
  loading = false,
  rowKey = 'id',
  filterCondition = {},
  setFilterCondition = () => {},
  showPagination = false,
  totalItem = 0,
  showRowSelection = false,
  size = 'middle',
  className = '',
  scrollX,
  scrollY,
  summary,
  rowClassName = () => '',
  expandableConfig,
}: TableComponentProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 40,
    renderCell: (checked: boolean) => (
      <Checkbox checked={checked} style={{ borderRadius: '4px' }} />
    ),
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => {
    let { current = 1 } = pagination;

    let { pageSize: newPageSize = 10 } = pagination;

    const orderMap: Record<'ascend' | 'descend', 'asc' | 'desc'> = {
      ascend: 'asc',
      descend: 'desc',
    };

    let sort_by: string | undefined;
    let order: 'asc' | 'desc' | undefined;

    if (!Array.isArray(sorter)) {
      newPageSize = filterCondition.page_size || 10;
      current = filterCondition.page || 1;
      sort_by = sorter.field as string;
      order = sorter.order ? orderMap[sorter.order as 'ascend' | 'descend'] : undefined;
    }

    setFilterCondition({
      ...filterCondition,
      page: current,
      page_size: newPageSize,
      sort_by,
      order,
    });
  };

  const { styles } = useStyle();
  return (
    <>
      <Table
        rowKey={rowKey}
        rowSelection={showRowSelection ? rowSelection : undefined}
        columns={columns}
        dataSource={dataSource}
        pagination={false} // Disable internal pagination, rely on external controls
        loading={loading}
        onChange={handleChange} // Use the combined handler
        expandable={expandableConfig}
        rowClassName={(record: T) => {
          const key = rowKey && record[rowKey as keyof T];

          return selectedRowKeys.includes(key as string)
            ? `bg-blue-50 ${rowClassName(record)}`
            : `${rowClassName(record)}`;
        }}
        className={`${styles.customTable} ${className}`}
        scroll={{ x: scrollX ?? 'max-content', y: scrollY ?? '50vh' }}
        size={size}
        onRow={(record) => ({
          onDoubleClick: (event) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.ant-checkbox-wrapper') && !target.closest('.ant-checkbox')) {
              handleDoubleRowClick(record);
            }
          },
          style: { cursor: 'pointer' },
        })}
        summary={summary}
      />

      {showPagination && (
        <PaginationControl
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          totalItem={totalItem}
        />
      )}
    </>
  );
};

export default TableComponent;
