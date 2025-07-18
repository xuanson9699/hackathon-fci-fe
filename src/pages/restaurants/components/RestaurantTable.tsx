import { useState } from 'react';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/ui/confirm-modal';
import PaginationControl from '@/components/ui/pagination-control';
import TableComponent from '@/components/ui/table-component';
import { formatDateTime } from '@/components/utils/date';
import { RestaurantItem } from '@/types';

import type { TableProps } from 'antd';

// Interface for table data
interface RestaurantTableProps<T = any> {
  data?: RestaurantItem[];
  loading?: boolean;
  filterCondition: T;
  setFilterCondition?: (condition: T) => void;
  totalItem: number;
}

const RestaurantTable: React.FC<RestaurantTableProps> = (props) => {
  const {
    data = [],
    loading = false,
    filterCondition,
    setFilterCondition = () => {},
    totalItem = 0,
  } = props;

  const navigate = useNavigate();

  const [selectedDeleteId, setSelectedDeleteId] = useState('');

  const handleNavigate = (record: RestaurantItem) => {
    navigate(`/restaurant/${record.restaurant_id}`, {
      state: { fromListUrl: location.pathname + location.search },
    });
  };

  const handleDeleteItem = () => {};

  const handleCancelDelete = () => {
    setSelectedDeleteId('');
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {data?.map((item) => {
          return (
            <StyledCol
              key={item.restaurant_id}
              span={8}
              className="group flex transition-all duration-200 hover:shadow-lg hover:opacity-95 cursor-pointer"
              onClick={() => handleNavigate(item)}
            >
              <Card
                title={<a>{item.name}</a>}
                size="small"
                style={{ flex: 1 }}
                className="group-hover-card"
              >
                <div className="flex flex-col gap-2 p-2">
                  <Row className="b-bottom">
                    <Col span={8} className="text-secondary">
                      Video
                    </Col>
                    <Col span={16}>{item.video_count}</Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-secondary">
                      Latest Uploadded
                    </Col>
                    <Col span={16}>{formatDateTime(item.latest_uploaded)}</Col>
                  </Row>
                </div>
              </Card>
            </StyledCol>
          );
        })}
      </Row>
      <PaginationControl
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        totalItem={totalItem}
      />
      {selectedDeleteId && (
        <ConfirmModal
          handleOk={handleDeleteItem}
          handleCancel={handleCancelDelete}
          title="Are you sure you want to delete this item?"
        >
          <></>
        </ConfirmModal>
      )}
    </>
  );
};

export default RestaurantTable;

const StyledCol = styled(Col)`
  &:hover .ant-card-head {
    background-color: #e0f2fe;
    transition: background-color 0.3s;
  }
`;
